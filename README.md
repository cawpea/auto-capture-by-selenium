# [WIP] auto-capture-by-selenium

## 事前準備(Windows, Mac共通)

### Javaバージョン確認

コンソールを開いて、以下のコマンドを実行
```bash
java -version
```

もし、javaのバージョンが1.8以下の場合は更新が必要なため、以下のフォルダにあるexeファイルを実行する。
\lib\java\jre-8u91-windows-i586-iftw.exe

### Nodeモジュールインストール

コンソールを開いて、`selenium` ディレクトリまで移動し、以下のコマンドを実行。
```bash
npm install
```

### Graphics Magickのインストール

以下のインストーラを実行し、Graphics Magickをインストール。
\lib\graphic-magick\GraphicsMagick-1.3.24-Q16-win32-dll.exe

## 事前準備(Windowsのみ)

#### レジストリに設定を追加

IEでBasic認証を行うために以下のbatを実行してレジストリに設定を追加する
\shell\config-for-ie.bat

*上記についての詳細は[こちら](http://aleetesting.blogspot.jp/2011/10/selenium-webdriver-tips.html)の記事をご参照ください。*

## Seleniumの実行

### Selenium Serverの起動

以下のbatファイルを実行する。

Windowsの場合
\shell\startup-selenium-server.bat

Macの場合
```bash
sh \shell\startup-selenium-server.sh
```

### テストスクリプトの実行

テストコードを実行し、キャプチャ処理を実行する。
```bash
node scripts/capture.js
```