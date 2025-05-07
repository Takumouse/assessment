'use strict';
const userNameInput    = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision   = document.getElementById('result-area');
const tweetDivision    = document.getElementById('tweet-area');

// Enterキーで診断できるようにする（初期設定）
userNameInput.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    assessmentButton.dispatchEvent(new Event('click'));
  }
});

// クリック時の処理
assessmentButton.addEventListener('click', () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return; // 名前が空の時は処理を終了
  }

  // 結果エリア／ツイートエリアをクリア
  resultDivision.innerText = '';
  tweetDivision.innerText  = '';

  // 診断結果エリアの作成
  const headerDivision = document.createElement('div');
  headerDivision.className = 'card-header text-bg-primary';
  headerDivision.innerText = '診断結果';

  const bodyDivision = document.createElement('div');
  bodyDivision.className = 'card-body';
  const paragraph = document.createElement('p');
  const result    = assessment(userName);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  resultDivision.className = 'card';
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

  // ツイートエリアの作成
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&text=' +
    encodeURIComponent(result);
  anchor.href      = hrefValue;
  anchor.className = 'twitter-hashtag-button';
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivision.appendChild(anchor);

  const script = document.createElement('script');
  script.src = 'https://platform.twitter.com/widgets.js';
  tweetDivision.appendChild(script);
});

// 診断ロジックとテストはそのまま
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。',
  '###userName###のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];

function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }
  const index = sumOfCharCode % answers.length;
  return answers[index].replaceAll('###userName###', userName);
}

function test() {
  console.log('診断結果の文章のテスト');
  console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '太郎のテスト失敗'
  );
  console.assert(
    assessment('次郎') ===
      '次郎のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる次郎が皆から評価されています。',
    '次郎のテスト失敗'
  );
  console.assert(
    assessment('花子') ===
      '花子のいいところはまなざしです。花子に見つめられた人は、気になって仕方がないでしょう。',
    '花子のテスト失敗'
  );
  console.log('テスト完了');
}
test();
