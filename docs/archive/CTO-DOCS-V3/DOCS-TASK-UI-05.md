# 技术实现文档: TASK-UI-05 周期复盘日历表展示

## 1. 目标

根据CTO的V3.0审查报告，优化周期复盘页面的数据展示方式。移除“累计字数”统计，并将核心的打卡数据从简单的数字卡片，升级为更直观、信息更丰富的日历热力图形式。

## 2. 核心需求

- **移除统计项**: 不再显示“累计字数”。
- **引入日历视图**: 
  - **7日/30日复盘**: 使用标准的日历格子视图。
  - **半年/年度复盘**: 使用更宏观的周或月聚合视图。
- **数据可视化**: 在日历上用颜色区分“有意义”、“无意义”和“未打卡”的日期。

## 3. 推荐库

为了快速实现高质量的日历热力图，推荐使用 `react-calendar-heatmap` 或 `react-activity-calendar` 这类成熟的库。

**安装**: `npm install react-calendar-heatmap`

## 4. 实现步骤

### 步骤1: 创建 `CalendarStats` 组件

在 `components/review/` 目录下创建一个新组件 `CalendarStats.tsx`。

```tsx
// components/review/CalendarStats.tsx

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 引入基础样式

interface CalendarStatsProps {
  period: '7d' | '30d' | '6m' | '1y';
  checkInData: { date: string; isMeaningful: boolean }[];
}

export function CalendarStats({ period, checkInData }: CalendarStatsProps) {
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dayData = checkInData.find(d => d.date === dateString);

      if (dayData) {
        return dayData.isMeaningful ? 'meaningful-day' : 'not-meaningful-day';
      }
    }
    return null;
  };

  return (
    <div>
      <h3 className="text-xl font-bold font-serif mb-4">打卡日历</h3>
      <div className="calendar-container">
        <Calendar
          tileClassName={tileClassName}
          // 可以根据period设置不同的activeStartDate等
        />
      </div>
      <style jsx global>{`
        .meaningful-day {
          background-color: #D43628 !important; /* 有意义 - 红色 */
          color: white !important;
          border-radius: 50%;
        }
        .not-meaningful-day {
          background-color: #E5E7EB !important; /* 无意义 - 灰色 */
          border-radius: 50%;
        }
        /* ... 其他自定义样式 */
      `}</style>
    </div>
  );
}
```

### 步骤2: 修改 `StatsSummary.tsx` 组件

移除“累计字数”的逻辑。

```tsx
// components/review/StatsSummary.tsx

// ...
export default function StatsSummary({ totalDays, yesDays, yesRatio }) {
  const stats = [
    { label: '打卡天数', value: totalDays.toString(), unit: '天' },
    { label: '有意义天数', value: yesDays.toString(), unit: '天' },
    { label: '有意义比例', value: yesRatio.toFixed(1), unit: '%' },
    // { label: '累计字数', ... } // <--- 移除此项
  ];

  // ...
}
```

### 步骤3: 在复盘页面中集成 `CalendarStats`

修改 `app/review/[period]/page.tsx`，引入并使用新的日历组件，替代部分旧的统计展示。

```tsx
// app/review/[period]/page.tsx

// ... imports
import { CalendarStats } from '@/components/review/CalendarStats';

export default function ReviewPeriodPage() {
  // ... state and hooks
  const [stats, setStats] = useState<any>(null);

  // ... useEffect to load data

  return (
    <div className="review-container">
      {/* ... */}
      
      {/* 保留核心数字统计 */}
      {stats && <StatsSummary {...stats} />}

      {/* 新增日历视图 */}
      {stats && stats.dailyData && (
        <CalendarStats period={period} checkInData={stats.dailyData} />
      )}

      {/* ... 其他组件 */}
    </div>
  );
}
```

### 步骤4: 调整 `review-service.ts`

确保 `getReviewStats` 函数能够返回一个包含每日打卡数据的数组 `dailyData`。

```typescript
// lib/review-service.ts

export async function getReviewStats(period: PeriodType, address: string) {
  // ... 现有逻辑

  const dailyData = allReflections.map(r => ({
    date: new Date(r.createdAt).toISOString().split('T')[0],
    isMeaningful: r.meaningful,
  }));

  return {
    // ... 现有统计数据
    dailyData, // <--- 新增返回字段
  };
}
```

## 5. 验收标准

- [ ] 周期复盘页面的“统计摘要”中不再显示“累计字数”。
- [ ] 页面上新增了一个日历视图。
- [ ] **7日/30日复盘**: 日历以标准的月视图格子形式展示。
- [ ] **颜色区分**: 日历中，打卡日期根据“是否是“有意义的一天””显示不同的背景颜色（例如，有意义为红色，无意义为灰色）。未打卡日期则为默认样式。
- [ ] **数据准确性**: 日历上高亮的日期和颜色，与用户的实际打卡数据完全对应。
- [ ] （可选）半年和年度复盘的日历视图，可以使用更宏观的热力图形式展示，如图（如GitHub贡献图），但这超出了基本要求，可以作为加分项。
