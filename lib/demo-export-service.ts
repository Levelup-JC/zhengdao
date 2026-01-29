/**
 * 数据导出服务
 * 支持导出为 JSON、CSV、PNG 格式
 */

import { DemoDataGenerator } from './demo-data-generator';

/**
 * 数据导出服务
 */
export class DemoExportService {
  /**
   * 导出为 JSON
   */
  async exportToJSON(data: any, filename = 'zhengdao-demo-data.json'): Promise<void> {
    try {
      const json = JSON.stringify(data, null, 2);
      this.downloadFile(json, filename, 'application/json');
    } catch (error) {
      console.error('JSON 导出失败:', error);
      throw error;
    }
  }

  /**
   * 导出为 CSV
   */
  async exportToCSV(
    data: any[],
    filename = 'zhengdao-demo-data.csv'
  ): Promise<void> {
    try {
      if (!data || data.length === 0) {
        throw new Error('没有数据可导出');
      }

      const csv = this.convertToCSV(data);
      this.downloadFile(csv, filename, 'text/csv;charset=utf-8;');
    } catch (error) {
      console.error('CSV 导出失败:', error);
      throw error;
    }
  }

  /**
   * 导出图表为 PNG
   */
  async exportChartAsPNG(
    elementId: string,
    filename = 'zhengdao-chart.png'
  ): Promise<void> {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`元素 ${elementId} 不存在`);
      }

      // 动态导入 html2canvas
      let html2canvas: any;
      try {
        // @ts-ignore - html2canvas 是可选依赖
        const module = await import('html2canvas');
        html2canvas = module.default || module;
      } catch (importError) {
        throw new Error('html2canvas 库未安装。请运行: npm install html2canvas');
      }

      const canvas = await html2canvas(element, {
        backgroundColor: '#FFFEF2',
        scale: 2, // 高清
        logging: false,
      });

      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    } catch (error) {
      console.error('PNG 导出失败:', error);
      throw error;
    }
  }

  /**
   * 导出所有演示数据
   */
  async exportAllDemoData(): Promise<void> {
    try {
      const reflections = await DemoDataGenerator.exportToJSON();
      const data = JSON.parse(reflections);
      await this.exportToJSON(data, 'zhengdao-all-data.json');
    } catch (error) {
      console.error('导出所有数据失败:', error);
      throw error;
    }
  }

  /**
   * 转换为 CSV 格式
   */
  private convertToCSV(data: any[]): string {
    if (!data || data.length === 0) return '';

    // 获取所有键
    const keys = Object.keys(data[0]);

    // 创建标题行
    const headers = keys.join(',');

    // 创建数据行
    const rows = data.map(row => {
      return keys.map(key => {
        const value = row[key];
        // 处理包含逗号或引号的值
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value ?? '';
      }).join(',');
    });

    return [headers, ...rows].join('\n');
  }

  /**
   * 下载文件
   */
  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

/**
 * 单例实例
 */
export const demoExportService = new DemoExportService();
