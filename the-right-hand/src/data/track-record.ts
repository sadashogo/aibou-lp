export interface TrackRecordMetric {
  value: string;
  label: string;
}

export interface TrackRecordFact {
  text: string;
}

export interface TrackRecordImplementation {
  text: string;
}

export interface Principal {
  name: string;
  role: string;
}

export interface TrackRecordData {
  framing: string;
  metrics: TrackRecordMetric[];
  facts: TrackRecordFact[];
  implementations: TrackRecordImplementation[];
  ongoing: string;
  principal?: Principal;
}

export const trackRecord: TrackRecordData = {
  framing:
    '既存の業務プロセスに入り込み、実際に稼働するところまで作ってきた実績です。',
  metrics: [{ value: '約80分 → 10〜15分', label: '運送業務の配車作業を自動化' }],
  facts: [
    { text: 'デジタコ（運行記録計）データの分析による燃費改善' },
    {
      text: 'テールゲートリフター補助金の申請、ホワイト物流・健康経営の認定取得',
    },
  ],
  implementations: [
    { text: '業務自動化LINE Bot' },
    { text: 'Excel VBAによる月次処理の自動化' },
    { text: 'Chrome拡張' },
    { text: 'ブラウザ自動化によるデータ取得' },
    { text: '業務マニュアル生成ツール' },
  ],
  ongoing: 'サロン業2社へ、月額で継続支援中',
};
