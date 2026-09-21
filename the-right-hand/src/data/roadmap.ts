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
      '進行中の見積書や提案を中立に精査し、過剰な投資をその場で削ります。',
    deliverables: ['AI投資セカンドオピニオン報告書', 'コスト適正化提言書'],
  },
  {
    phase: 'Phase 2',
    period: '3〜6週目',
    focusTitle: '社内に眠っている情報の整理',
    focusDescription:
      '業務手順、過去の営業履歴、判断記録をAIが学習できる形式に整理。',
    deliverables: ['社内データの棚卸しマップ', '「右腕AI」の設計書'],
  },
  {
    phase: 'Phase 3',
    period: '7〜10週目',
    focusTitle: '試作と、情報を外に出さない設計',
    focusDescription:
      '社外にデータを出さない仕組みを整えたうえで、中核の業務を自動化します。',
    deliverables: ['社内専用AI実証プロトタイプ', 'セキュリティ利用規約'],
  },
  {
    phase: 'Phase 4',
    period: '継続顧問',
    focusTitle: '取締役会・経営戦略顧問',
    focusDescription:
      '月次のオンライン定例。最新AIの要否判定と、経営判断の伴走。',
    deliverables: ['月次の技術レビュー報告書', '経営判断のための論点整理'],
  },
];
