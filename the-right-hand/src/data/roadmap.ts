export interface RoadmapPhase {
  phase: string;
  period: string;
  focusTitle: string;
  focusDescription: string;
  deliverables: string[];
}

export const roadmap: RoadmapPhase[] = [
  {
    phase: 'Phase 1',
    period: '1〜2週目',
    focusTitle: 'AI投資のセカンドオピニオン',
    focusDescription:
      '進行中の見積書や提案を中立に精査し、過剰な投資を即時カット。',
    deliverables: ['AI投資セカンドオピニオン報告書', 'コスト適正化提言書'],
  },
  {
    phase: 'Phase 2',
    period: '3〜6週目',
    focusTitle: '社内隠れ資産の構造化',
    focusDescription:
      '業務手順、過去の営業履歴、判断記録をAIが学習できる形式に整理。',
    deliverables: ['社内データ資産構造マップ', '右腕AI企画設計書'],
  },
  {
    phase: 'Phase 3',
    period: '7〜10週目',
    focusTitle: 'プロトタイプ検証・防護壁の配備',
    focusDescription:
      '機密データを社外に出さない技術防護を敷き、現場の中核業務を自動化。',
    deliverables: ['社内専用AI実証プロトタイプ', 'セキュリティ利用規約'],
  },
  {
    phase: 'Phase 4',
    period: '継続顧問',
    focusTitle: '取締役会・経営戦略顧問',
    focusDescription:
      '月次のオンライン定例。最新AIの要否判定と、経営判断の伴走。',
    deliverables: ['月次テクノロジー監査報告書', '役員向け戦略インサイト'],
  },
];
