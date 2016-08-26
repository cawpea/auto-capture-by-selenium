# auto-capture-by-selenium

## 概要

特定のWebページのキャプチャ画像を自動で取得します。
[Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/)を使用しているので、マルチブラウザ(Firefox, Chrome, IE)で実行可能です。
※IEはWindows環境のみ

## 環境構築

### 予めインストールが必要なもの

- Node.js
- 各ブラウザ( Firefox, Chrome, IE )
- [JRE](https://java.com/ja/download/) 1.8以上
- [Graphics Magick](http://www.graphicsmagick.org/index.html)

### 初期設定

#### リポジトリをクローン

```bash
$ git clone https://github.com/masaki-ohsumi/auto-capture-by-selenium.git
```

#### node_modulesインストール

リポジトリクローン先のディレクトリまで移動し、以下のコマンドを実行

```bash
$ npm install
```

### Windowsのみ設定

#### レジストリに設定追加

IEでBasic認証を行うために以下のbatを実行してレジストリに設定を追加

`/util/config-for-ie.bat`

*上記についての詳細は[こちらの記事](http://aleetesting.blogspot.jp/2011/10/selenium-webdriver-tips.html)をご参照ください。*

## キャプチャ処理の実行

以降の手順でコンソールからコマンドを実行する場合はリポジトリクローン先の`auto-capture-by-selenium`ディレクトリ直下で実行する事を前提とします。

### Selenium Server起動

#### Hubサーバーの起動

```
$ sh util/startup-selenium-hub.sh
```

#### Nodeサーバーの起動(Windowsの場合)

以下のbatファイルを実行（ファイルをダブルクリックでOK）

`/util/startup-selenium-server_win.bat`

#### Nodeサーバーの起動(Macの場合)

```bash
$ sh util/startup-selenium-server_mac.sh
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
   ],
   "sp": [
   	"https://www.google.co.jp/",
   	"http://m.yahoo.co.jp/"
   ]
  }
 ]
}
```

### スクリプトの実行

別のコンソールを起動後、以下のコマンドを実行

```bash
$ node capture.js
```

#### 起動オプション

起動時にブラウザの選択、Basic認証が必要な場合はオプションを指定してください。

|オプション名|初期値    |説明                                                                                                                 |
| ------------ |--------| ------------------------------------------------------------------------------|
|browser       |firefox    |キャプチャ実行時のブラウザを["firefox", "chrome", "ie"]の中から指定します。|
|basicId        |無し        |Basic認証が必要な場合にID(ユーザー名)を指定します。                                 |
|basicPass   |無し        |Basic認証が必要な場合にPasswordを指定します。                                         |
|windowWidth |無し        |ブラウザ起動時のウインドウ幅を指定します。                                                 |
|windowHeight|無し        |ブラウザ起動時のウインドウ高さを指定します。                                                |
|deviceType  |pc         |指定した値を元に、capture-list.jsonのcaptureTargetから同名のURLリストを取得し、キャプチャします。"sp"を指定した場合のデフォルトウインドウサイズはiPhone5(320x568)のサイズになります。|

```bash:Example
//chromeで実行
$ node capture.js --browser=chrome

//Basic認証パラメータを指定
$ node capture.js --basicId=id --basicPass=pass

//"sp"のURLをキャプチャ
$ node capture.js --deviceType=sp
```

起動オプションは`node capture.js -h`で参照可能です。

スクリプトが正常に実行された場合は、`output`ディレクトリ配下にキャプチャ画像が保存されます。

## 注意事項

### キャプチャが動作しない場合

Firefox v47.0.0ではSelenium WebDriverが動作しない事が分かっています。
バージョンを変更しても問題ない場合は、[Firefox v47.0.1](https://www.mozilla.org/en-US/firefox/47.0.1/releasenotes/)をご利用ください。

### 現状出来ない事（今後対応出来たらしたい）

- Safariでのキャプチャ取得はできません。（色々と手続きが必要らしいが、あまり調べられてない）
- UserAgentがモバイル端末（iPhone, Android）でのキャプチャ取得はできません。
- モーダルなどwindow以外のスクロール部分はキャプチャされません。
- 初期表示時のキャプチャになるため、ローディングなどがある場合は使えなさそう。

### その他

- ブラウザ毎にキャプチャの挙動が異なる場合があります。***Selenium標準実装のキャプチャ処理ではChromeではブラウザに表示されている範囲のみをキャプチャする***（スクロールして表示される範囲はキャプチャしてくれない）ため、部分的且つ逐次的にキャプチャ処理を実行し、画像を連結する事で１枚のキャプチャにしています。
