# 技术实现文档: TASK-UI-06 成就系统集成到个人主页

## 1. 目标

根据CTO的V3.0审查报告，调整成就系统的展示逻辑。将SBT成就的展示完全集成到个人主页中，使其成为个人主页的一个核心模块，而不是一个独立的页面。同时，优化SBT卡片的UI，确保在移动端视图下有良好的美观性。

## 2. 核心需求

- **集成**: 将成就系统（SBT展示）作为个人主页的一部分。
- **优先级**: 强化个人主页，弱化或移除独立的 `/achievements` 页面。
- **UI优化**: 调整SBT卡片样式，确保标题等文字在一行内显示，避免在移动端出现不美观的换行。
- **徽章展示**: 在个人主页顶部（用户信息区域）以小图标/徽章的形式，展示用户已获得的关键SBT。

## 3. 实现步骤

### 步骤1: 强化 `SBTShowcase` 组件

修改 `components/profile/SBTShowcase.tsx`，使其功能更完整，并优化UI。

```tsx
// components/profile/SBTShowcase.tsx

// ... imports

export function SBTShowcase({ sbts }) {
  return (
    <div className="sbt-showcase-container">
      <h3 className="section-title">我的成就徽章</h3>
      <div className="sbt-grid">
        {sbts.map(sbt => (
          <div key={sbt.tokenId} className="sbt-card">
            <div className="sbt-image-wrapper">
              <Image src={sbt.image} alt={sbt.title} layout="fill" objectFit="cover" />
            </div>
            <div className="sbt-info">
              <p className="sbt-title">{sbt.title}</p>
              <span className="sbt-chain-tag">{sbt.chain}</span>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        /* ... */
        .sbt-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 1rem;
        }
        .sbt-card {
          /* ... */
        }
        .sbt-title {
          font-size: 0.875rem; /* 调整字体大小 */
          font-weight: bold;
          white-space: nowrap; /* 强制不换行 */
          overflow: hidden;
          text-overflow: ellipsis; /* 超出部分显示省略号 */
          max-width: 100%;
        }
        /* ... */
      `}</style>
    </div>
  );
}
```

### 步骤2: 在个人主页中集成 `SBTShowcase`

修改 `app/profile/page.tsx`，将 `SBTShowcase` 组件放置在个人主页的合适位置（例如，人生目标下方）。

```tsx
// app/profile/page.tsx

// ... imports
import { SBTShowcase } from '@/components/profile/SBTShowcase';

export default function ProfilePage() {
  // ... state and hooks

  return (
    <div className="profile-container">
      {/* ... UserInfo, GoalDisplay, etc. */}

      {/* 打卡时间线 */}
      <CheckInTimeline limit={5} />

      {/* SBT 成就展示 */}
      {profileData && profileData.sbts && (
        <SBTShowcase sbts={profileData.sbts} />
      )}

    </div>
  );
}
```

### 步骤3: 创建徽章展示组件 `AchievementBadges`

在 `components/profile/` 目录下创建一个新组件 `AchievementBadges.tsx`，用于在用户信息区域展示小的徽章图标。

```tsx
// components/profile/AchievementBadges.tsx

import Image from 'next/image';

export function AchievementBadges({ sbts }) {
  // 只展示最高等级的3个徽章
  const topBadges = sbts.slice().sort((a, b) => b.level - a.level).slice(0, 3);

  return (
    <div className="badge-container">
      {topBadges.map(badge => (
        <div key={badge.tokenId} className="badge-wrapper" title={badge.title}>
          <Image src={badge.image} alt={badge.title} width={32} height={32} />
        </div>
      ))}
    </div>
  );
}
```

### 步骤4: 在 `UserInfo` 组件中集成徽章

修改 `components/profile/UserInfo.tsx`，引入并使用 `AchievementBadges`。

```tsx
// components/profile/UserInfo.tsx

// ... imports
import { AchievementBadges } from './AchievementBadges';

export function UserInfo({ user, sbts }) {
  return (
    <div className="user-info-card">
      <div className="avatar-and-name">
        {/* ... Avatar and Name */}
      </div>
      <div className="badges-section">
        <AchievementBadges sbts={sbts} />
      </div>
    </div>
  );
}
```

### 步骤5: 简化或移除 `/achievements` 页面

- **方案A (推荐)**: 将 `/achievements` 页面重定向到 `/profile`。
- **方案B**: 保留 `/achievements` 页面，但将其定位为一个“SBT铸造中心”，而不是展示页面。

**重定向实现**: 
```tsx
// app/achievements/page.tsx

import { redirect } from 'next/navigation';

export default function AchievementsPage() {
  redirect('/profile');
}
```

## 5. 验收标准

- [ ] 独立的 `/achievements` 页面已被移除或重定向到个人主页。
- [ ] 个人主页 (`/profile`) 中现在包含一个完整的SBT成就展示模块。
- [ ] SBT卡片在移动端视图下，标题不会出现不美观的多行换行，能保持在一行内（超出部分用省略号表示）。
- [ ] 个人主页顶部的用户信息区域，会以小徽章的形式展示用户已获得的最高等级的几个SBT成就。
- [ ] 个人主页的整体布局和优先级得到提升，成为一个功能强大的核心页面。
