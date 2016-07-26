# auto-capture-by-selenium

## 概要

特定のWebページのキャプチャ画像を自動で取得します。
Seleniumを使用しているので、マルチブラウザ(Firefox, Chrome, IE, Safari)で実行可能です。

## 環境構築

### Windows, Mac共通

#### JREバージョン確認

```bash
$ java -version
```

もし、javaのバージョンが1.8以下の場合は更新が必要なため、以下のフォルダにあるexeファイルを実行するか、[Javaのサイト](https://java.com/ja/download/)から最新を取得してインストールしてください。

`\lib\java\jre-8u91-windows-i586-iftw.exe`

#### リポジトリからソース取得

```bash
$ git clone https://github.com/masaki-ohsumi/auto-capture-by-selenium.git
```

#### node_modulesインストール

リポジトリクローン先のディレクトリまで移動し、以下のコマンドを実行

```bash
$ npm install
```

#### Graphics Magickインストール

以下のインストーラを実行し、Graphics Magickをインストール

`\lib\graphic-magick\GraphicsMagick-1.3.24-Q16-win32-dll.exe`

### Windowsのみ

#### レジストリに設定追加

IEでBasic認証を行うために以下のbatを実行してレジストリに設定を追加

`\shell\config-for-ie.bat`

*上記についての詳細は[こちらの記事](http://aleetesting.blogspot.jp/2011/10/selenium-webdriver-tips.html)をご参照ください。*

## キャプチャ処理の実行

以降の手順でコンソールからコマンドを実行する場合はリポジトリクローン先の`auto-capture-by-selenium`ディレクトリ直下で実行する事を前提とします。

### Selenium Server起動

#### Windowsの場合

以下のbatファイルを実行（ファイルをダブルクリックでOK）

`/shell/selenium-server.bat`

#### Macの場合

```bash
$ sh shell/startup-selenium-server.sh
```

### キャプチャ対象のURL指定

`input/capture-list.json`にキャプチャ対象のURLを記述

```json
{
 "captureTarget": [
  {
   "pc": [
    "https://www.google.co.jp/",
    "http://www.yahoo.co.jp/"
   ]
  }
 ]
}
```

### スクリプトの実行

別のコンソールを起動後、以下のコマンドを実行

```bash
$ node auto-capture.js
```

上記コマンドではFirefoxで処理を実行します。他のブラウザで実行する場合は以下のように指定します。

```
//Chromeで起動する場合
$ node auto-capture.js chrome

//IEで起動する場合(Windowsの場合のみ)
$ node auto-capture.js ie
```

スクリプトが正常に実行された場合は、`output`ディレクトリ配下にキャプチャ画像が保存されます。

## 注意事項

### 現状出来ない事（今後対応出来たらしたい）

- Safariでのキャプチャ取得はできません。（色々と手続きが必要らしいが、あまり調べられてない）
- UserAgentがモバイル端末（iPhone, Android）でのキャプチャ取得はできません。
- モーダルなどwindow以外のスクロール部分はキャプチャされません。
- 初期表示時のキャプチャになるため、ローディングなどがある場合は使えなさそう。

### その他

- ブラウザ毎にキャプチャの挙動が異なる場合があります。Selenium標準実装のキャプチャ処理ではChromeではブラウザに表示されている範囲のみをキャプチャする（スクロールして表示される範囲はキャプチャしてくれない）ため、部分的且つ逐次的にキャプチャ処理を実行し、画像を連結する事で１枚のキャプチャにしています。
