'use client';

/**
 * 可编辑的AI预览组件
 * 允许用户修改AI提取的每个字段
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnhancedReflectionData } from '@/lib/ai-enhanced';

interface EditableAIPreviewProps {
  /** 用户原文 */
  originalText: string;
  /** AI分析数据 */
  aiData: EnhancedReflectionData;
  /** 确认回调 */
  onConfirm: (editedData: EnhancedReflectionData) => void;
  /** 返回编辑回调 */
  onBack: () => void;
  /** 保存中状态 */
  isSaving?: boolean;
}

export function EditableAIPreview({
  originalText,
  aiData,
  onConfirm,
  onBack,
  isSaving = false,
}: EditableAIPreviewProps) {
  const [editedData, setEditedData] = useState<EnhancedReflectionData>(aiData);
  const [editingField, setEditingField] = useState<string | null>(null);

  /** 更新字段值 */
  const updateField = <K extends keyof EnhancedReflectionData>(
    field: K,
    value: EnhancedReflectionData[K]
  ) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  /** 添加数组项 */
  const addArrayItem = (field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords') => {
    setEditedData(prev => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
    setEditingField(`${field}-${editedData[field].length}`);
  };

  /** 删除数组项 */
  const removeArrayItem = (
    field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords',
    index: number
  ) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  /** 更新数组项 */
  const updateArrayItem = (
    field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords',
    index: number,
    value: string
  ) => {
    setEditedData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl mx-auto"
    >
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h2
          className="text-3xl font-bold text-ink"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          AI深度分析
        </h2>
        <p className="text-ink/60" style={{ fontFamily: 'Georgia, serif' }}>
          点击任意内容即可编辑
        </p>
      </div>

      {/* 评分卡片 */}
      <div className="bg-paper border-2 border-ink/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
            本日评分
          </h3>
          <div className="text-4xl font-bold text-seal">
            {editedData.rating}/10
          </div>
        </div>

        {/* 可调节的滑块 */}
        <input
          type="range"
          min="1"
          max="10"
          value={editedData.rating}
          onChange={(e) => updateField('rating', parseInt(e.target.value))}
          className="w-full h-2 bg-ink/10 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between text-xs text-ink/40 mt-1">
          <span>1分</span>
          <span>10分</span>
        </div>
      </div>

      {/* 情绪分析 */}
      <div className="bg-paper border-2 border-ink/20 p-6 space-y-4">
        <h3 className="text-lg font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
          情绪状态
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-ink/60 mb-1 block">情绪类型</label>
            <select
              value={editedData.emotion}
              onChange={(e) => updateField('emotion', e.target.value)}
              className="w-full px-3 py-2 border-2 border-ink/30 bg-paper text-ink focus:border-seal outline-none"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              <option value="积极向上">积极向上</option>
              <option value="平和稳定">平和稳定</option>
              <option value="略感焦虑">略感焦虑</option>
              <option value="明显疲惫">明显疲惫</option>
              <option value="充满期待">充满期待</option>
              <option value="略显沮丧">略显沮丧</option>
              <option value="复杂混合">复杂混合</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-ink/60 mb-1 block">情绪详情</label>
            <input
              type="text"
              value={editedData.emotionDetail || ''}
              onChange={(e) => updateField('emotionDetail', e.target.value)}
              placeholder="15字内描述"
              className="w-full px-3 py-2 border-2 border-ink/30 bg-paper text-ink focus:border-seal outline-none"
              style={{ fontFamily: 'Georgia, serif' }}
              maxLength={15}
            />
          </div>
        </div>
      </div>

      {/* 核心收获 */}
      <EditableSection
        title="核心收获"
        subtitle="今天最有价值的3件事"
        items={editedData.gains}
        field="gains"
        onAdd={addArrayItem}
        onUpdate={updateArrayItem}
        onRemove={removeArrayItem}
        icon="✓"
      />

      {/* 待改进点 */}
      <EditableSection
        title="待改进点"
        subtitle="明天可以更好的地方"
        items={editedData.losses}
        field="losses"
        onAdd={addArrayItem}
        onUpdate={updateArrayItem}
        onRemove={removeArrayItem}
        icon="→"
      />

      {/* 深度洞察 */}
      <EditableSection
        title="深度洞察"
        subtitle="今天最重要的发现"
        items={editedData.insights}
        field="insights"
        onAdd={addArrayItem}
        onUpdate={updateArrayItem}
        onRemove={removeArrayItem}
        icon="💡"
        highlight
      />

      {/* 可行动建议 */}
      <EditableSection
        title="明日行动"
        subtitle="明天可以尝试的2-3个改变"
        items={editedData.actions}
        field="actions"
        onAdd={addArrayItem}
        onUpdate={updateArrayItem}
        onRemove={removeArrayItem}
        icon="⚡"
      />

      {/* 关键词 */}
      <div className="bg-paper border-2 border-ink/20 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
              关键词
            </h3>
            <p className="text-xs text-ink/40">快速回顾今天的主题</p>
          </div>
          <button
            onClick={() => addArrayItem('keywords')}
            className="px-3 py-1 text-xs border-2 border-ink/30 text-ink/70 hover:border-ink hover:text-ink"
          >
            + 添加
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {editedData.keywords.map((keyword, index) => (
              <EditableKeyword
                key={index}
                value={keyword}
                onUpdate={(value) => updateArrayItem('keywords', index, value)}
                onRemove={() => removeArrayItem('keywords', index)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 时间分析（如果有） */}
      {editedData.timeAnalysis && (
        <div className="bg-paper border-2 border-ink/20 p-6 space-y-4">
          <h3 className="text-lg font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
            时间使用分析
          </h3>

          <div className="space-y-3">
            <TimeBar
              label="高效时间"
              value={editedData.timeAnalysis.productive}
              color="bg-seal"
              onChange={(value) =>
                updateField('timeAnalysis', {
                  ...editedData.timeAnalysis!,
                  productive: value,
                })
              }
            />
            <TimeBar
              label="浪费时间"
              value={editedData.timeAnalysis.wasted}
              color="bg-red-500"
              onChange={(value) =>
                updateField('timeAnalysis', {
                  ...editedData.timeAnalysis!,
                  wasted: value,
                })
              }
            />
            <TimeBar
              label="休息时间"
              value={editedData.timeAnalysis.rest}
              color="bg-ink/30"
              onChange={(value) =>
                updateField('timeAnalysis', {
                  ...editedData.timeAnalysis!,
                  rest: value,
                })
              }
            />
          </div>
        </div>
      )}

      {/* 原文参考 */}
      <details className="bg-ink/5 border border-ink/10">
        <summary className="px-4 py-2 cursor-pointer text-sm text-ink/60 font-bold">
          查看原文
        </summary>
        <div className="p-4 text-sm text-ink/70 whitespace-pre-wrap leading-relaxed"
             style={{ fontFamily: 'Georgia, serif' }}>
          {originalText}
        </div>
      </details>

      {/* 按钮组 */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          disabled={isSaving}
          className="flex-1 py-4 border-2 border-ink text-ink font-bold disabled:opacity-50 hover:bg-ink/5"
          style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
        >
          返回编辑
        </button>
        <button
          onClick={() => onConfirm(editedData)}
          disabled={isSaving}
          className="flex-1 py-4 bg-seal text-paper font-bold disabled:opacity-50 hover:bg-seal/90"
          style={{ borderRadius: 0, fontFamily: 'Georgia, serif' }}
        >
          {isSaving ? '保存中...' : '确认保存'}
        </button>
      </div>
    </motion.div>
  );
}

/** 可编辑的列表项组件 */
function EditableSection({
  title,
  subtitle,
  items,
  field,
  onAdd,
  onUpdate,
  onRemove,
  icon,
  highlight = false,
}: {
  title: string;
  subtitle: string;
  items: string[];
  field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords';
  onAdd: (field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords') => void;
  onUpdate: (field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords', index: number, value: string) => void;
  onRemove: (field: 'gains' | 'losses' | 'ideas' | 'insights' | 'actions' | 'keywords', index: number) => void;
  icon?: string;
  highlight?: boolean;
}) {
  return (
    <div className={`bg-paper border-2 p-6 space-y-3 ${highlight ? 'border-seal' : 'border-ink/20'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-ink flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            {icon && <span>{icon}</span>}
            {title}
          </h3>
          <p className="text-xs text-ink/40">{subtitle}</p>
        </div>
        <button
          onClick={() => onAdd(field)}
          className="px-3 py-1 text-xs border-2 border-ink/30 text-ink/70 hover:border-ink hover:text-ink"
        >
          + 添加
        </button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {items.map((item, index) => (
            <EditableItem
              key={index}
              value={item}
              onUpdate={(value) => onUpdate(field, index, value)}
              onRemove={() => onRemove(field, index)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** 单个可编辑项 */
function EditableItem({
  value,
  onUpdate,
  onRemove,
}: {
  value: string;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onUpdate(editValue);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className="flex items-start gap-2 group"
    >
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            autoFocus
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') {
                setEditValue(value);
                setIsEditing(false);
              }
            }}
            className="flex-1 px-3 py-2 border-2 border-seal bg-paper text-ink focus:outline-none"
            style={{ fontFamily: 'Georgia, serif' }}
          />
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-seal text-paper text-xs font-bold"
          >
            保存
          </button>
        </div>
      ) : (
        <>
          <div
            onClick={() => setIsEditing(true)}
            className="flex-1 px-3 py-2 border-2 border-transparent hover:border-ink/20 cursor-pointer text-ink"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {value || '点击编辑...'}
          </div>
          <button
            onClick={onRemove}
            className="opacity-0 group-hover:opacity-100 px-2 py-2 text-red-500 hover:bg-red-50 transition-opacity"
          >
            ✕
          </button>
        </>
      )}
    </motion.div>
  );
}

/** 可编辑的关键词标签 */
function EditableKeyword({
  value,
  onUpdate,
  onRemove,
}: {
  value: string;
  onUpdate: (value: string) => void;
  onRemove: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <motion.div
      layout
      className={isEditing ? '' : 'px-3 py-1 bg-seal/10 border-2 border-seal/30'}
    >
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onUpdate(e.target.value)}
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') setIsEditing(false);
          }}
          autoFocus
          className="px-2 py-1 border-2 border-seal bg-paper text-sm w-24 focus:outline-none"
          style={{ fontFamily: 'Georgia, serif' }}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-1 cursor-pointer group"
        >
          <span className="text-sm font-bold text-ink" style={{ fontFamily: 'Georgia, serif' }}>
            {value || '标签'}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="opacity-0 group-hover:opacity-100 text-red-500 text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </motion.div>
  );
}

/** 可调节的时间进度条 */
function TimeBar({
  label,
  value,
  color,
  onChange,
}: {
  label: string;
  value: number;
  color: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-ink/70">{label}</span>
        <span className="text-ink font-bold">{value}%</span>
      </div>
      <div className="relative h-3 bg-ink/10 rounded overflow-visible">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5 }}
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}
