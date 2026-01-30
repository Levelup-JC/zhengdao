# 技术实现文档: TASK-UI-07 游客模式预设个人主页

## 1. 目标

为“游客模式”（即未连接钱包的体验模式）提供一个丰富、完整的个人主页预设视图。当用户以游客身份访问个人主页时，系统应展示一个精心设计的、包含完整数据的演示账户，而不是一个空白页面或错误提示，以确保演示流程的顺畅和完整性。

## 2. 核心需求

- **创建预设数据**: 定义一个标准的、用于演示的个人主页数据结构。
- **条件加载**: 在个人主页加载时，判断当前是否为游客模式。
- **展示预设数据**: 如果是游客模式，则加载并展示预设的演示数据。
- **数据一致性**: 预设的数据应包含用户目标、打卡记录、SBT成就等，与一个真实用户的个人主页结构完全一致。

## 3. 实现步骤

### 步骤1: 创建预设数据文件 `demo-data.ts`

在 `lib/` 目录下创建一个新文件 `demo-data.ts`，用于存放所有演示数据。

```typescript
// lib/demo-data.ts

import { ProfileData } from "./profile-service"; // 假设有这个类型

export const demoProfileData: ProfileData = {
  user: {
    address: '0x1234...7890',
    joinDate: '2025-12-01',
  },
  goals: {
    wealth: { target: 1000000, strategy: '投资' },
    health: { target: '马拉松', plan: '每周跑步3次' },
    family: { target: '家庭旅行', frequency: '每年一次' },
    other: { target: '学习新语言', language: '西班牙语' },
  },
  stats: {
    totalCheckInDays: 58,
    meaningfulDays: 45,
    meaningfulRate: 78,
    currentStreak: 12,
  },
  checkIns: Array.from({ length: 58 }, (_, i) => ({
    id: i,
    date: new Date(new Date().setDate(new Date().getDate() - (58 - i))).toISOString(),
    isMeaningful: Math.random() > 0.2,
    originalText: `这是第 ${i + 1} 天的演示复盘内容...`,
    aiSummary: { title: `第 ${i + 1} 天的总结`, summary: 'AI生成的摘要', keywords: ['演示'] },
    photos: [],
  })).reverse(),
  sbts: [
    {
      tokenId: 1, level: 1, chain: 'bnb', title: '初窥门径',
      image: '/sbt-images/level-1/level-1.png', achievedDate: new Date(),
    },
    {
      tokenId: 2, level: 2, chain: 'bnb', title: '渐入佳境',
      image: '/sbt-images/level-2/level-2.png', achievedDate: new Date(),
    },
    {
      tokenId: 3, level: 3, chain: 'solana', title: '融会贯通',
      image: '/sbt-images/level-3/level-3.png', achievedDate: new Date(),
    },
  ],
};
```

### 步骤2: 修改 `profile-service.ts`

在 `ProfileService` 中添加一个方法，用于判断并返回相应的数据（真实数据或演示数据）。

```typescript
// lib/profile-service.ts

import { demoProfileData } from './demo-data';

export class ProfileService {
  static async getProfileData(address: string, isSkipMode: boolean) {
    if (isSkipMode) {
      // 如果是游客模式，直接返回预设的演示数据
      return demoProfileData;
    }

    // 否则，从数据库加载真实用户数据
    // ... (现有的加载逻辑)
    const userGoals = await OnboardingService.getOnboardingData(address);
    const userCheckIns = await ReflectionService.getAllReflections(address);
    // ... 组合数据

    return { /* ... 真实数据 */ };
  }
}
```

### 步骤3: 修改个人主页页面 `app/profile/page.tsx`

在页面加载时，将 `isSkipMode` 状态传递给 `ProfileService`。

```tsx
// app/profile/page.tsx

// ... imports
import { useSkipMode } from '@/lib/context/SkipModeContext';
import { ProfileService } from '@/lib/profile-service';
import { demoProfileData } from '@/lib/demo-data'; // 可以直接导入作为备用

export default function ProfilePage() {
  // ...
  const { address, isConnected } = useAccount();
  const { isSkipMode } = useSkipMode();
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (isSkipMode) {
          // 游客模式，直接使用预设数据
          setProfileData(demoProfileData);
        } else if (address) {
          // 真实用户，从服务加载数据
          const data = await ProfileService.getProfileData(address, false);
          setProfileData(data);
        }
      } catch (error) {
        // ... error handling
      } finally {
        setLoading(false);
      }
    };

    if (isConnected || isSkipMode) {
      loadData();
    }
  }, [address, isConnected, isSkipMode]);

  // ...

  // 钱包未连接且非游客模式时的处理
  if (!isConnected && !isSkipMode) {
    return <div>请先连接钱包或返回首页选择体验模式</div>;
  }

  // ... 渲染逻辑 (无需修改，因为它现在总是能收到完整的 profileData)
}
```

## 4. 验收标准

- [ ] 创建了 `lib/demo-data.ts` 文件，并定义了包含所有必要字段的 `demoProfileData` 对象。
- [ ] `app/profile/page.tsx` 页面逻辑已更新。
- [ ] **测试场景**: 
  1.  不连接钱包，在首页点击“跳过 / 体验模式”。
  2.  然后通过导航进入“个人主页”。
  3.  **预期结果**: 页面展示一个完整的、数据丰富的个人主页，包含预设的用户目标、打卡时间线、统计数据和SBT成就徽章。
  4.  **对比测试**: 连接一个真实的钱包，进入个人主页，应展示该钱包地址对应的真实数据（如果数据为空，则展示空状态），而不是演示数据。
