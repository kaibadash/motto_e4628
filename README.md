# motto_e4628

万屋一家シリーズの勤之助はシンプルでよいツールですが、もう一声欲しい！と思ってしまうところがあります。
そこを良くする [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja) のスクリプトです。

本スクリプトは以下を改善します。

- HTTP でアクセスしてログインした際に「SSL でアクセスしてください」と怒られるので、予めリダイレクトしておく
- 月初に出勤簿を表示した時は先月の出勤簿を表示する
- 各種申請は打刻申請をデフォルトにする
- 打刻申請で以下を行う
  - 時刻は現在時刻がデフォルトになっているが出勤時刻(定数)をデフォルトにする
  - 打刻申請の追加は日付がインクリメントされるが、1 つ前の日付の内容をコピーする
  - 退勤に変更した際の時刻は現在時刻がデフォルトになっているが退勤時刻(定数)をデフォルトにする

## 設定

1. [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ja)を Chrome にインストールします。
2. Tampermonkey の 設定画面のユーティリティの「URL からインストール」に `https://raw.githubusercontent.com/kaibadash/e4628_improvement/feature/dev1/index.js` をペーストします。
