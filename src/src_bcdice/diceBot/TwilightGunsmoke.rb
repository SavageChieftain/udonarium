# -*- coding: utf-8 -*-

class TwilightGunsmoke < DiceBot
  setPrefixes([
    '2D6.*', 'CT', 'OPR', 'OPC', 'EDR', 'EDC', 'RWL', 'RWB', 'RST',
    'RUP', 'DCP', 'DBD', 'DCR', 'DNJ', 'DRB', 'DBS', 'DTR', 'DMK', 'DHL',
    'DML', 'DZB', 'DMT', 'DHR', 'DKS', 'DFD'
  ])

  def initialize
    super
    
    @sendMode = 2
    @d66Type = 1
    @sortType = 1
  end
  def gameName
    'トワイライト・ガンスモーク'
  end
  
  def gameType
    "TwilightGunsmoke"
  end
 
  def getHelpMessage
    return <<INFO_MESSAGE_TEXT
・判定
　・通常判定　　　　　　2D6+m>=t[c,f]
　　修正値m,目標値t,クリティカル値c,ファンブル値fで判定ロールを行います。
　　クリティカル値、ファンブル値は省略可能です。([]ごと省略できます)
　　自動成功、自動失敗、成功、失敗を自動表示します。
・各種表
　・邂逅表　　CT
　・オープニングチャート
　　リアリスティック　OPR｜シネマティック　OPC
　・エンディングチャート
　　リアリスティック　EDR｜シネマティック　EDC
　・情報収集チャート
　　荒野　RWL｜ウェブ　RWB｜ストリート　RST｜上流　RUP
　・ドロップチャート
　　コーポレイト　DCP｜バンデッド　DBD｜クリミナル　DCR｜ニンジャ　DNJ
　　ロボ　DRB｜武装車輛　DBS｜ターレット　DTR｜メルカバ　DMK
　　ヘリ　DHL｜マシンライフ　DML｜ゾンビ　DZB｜ミュータント　DMT
　　BM／飛竜科　DHR｜BM／巨爪科　DKS｜フィーンド　DFD
・D66ダイスあり
INFO_MESSAGE_TEXT
  end
  
  
  def rollDiceCommand(command)
    
    result = checkRoll(command)
    return result unless(result.empty?)
    
    debug("判定ロールではなかった")
    
    debug("各種表として処理")
    return rollTableCommand(command)
  end
  
  
  def checkRoll(string)
    output = ''
    
    crit = 12
    fumble = 2
    
    return output unless(/^2D6([\+\-\d]*)>=(\d+)(\[(\d+)?(,(\d+))?\])?$/i =~ string)
    
    modText = $1
    target = $2.to_i
    crit = $4.to_i if($4)
    fumble = $6.to_i if($6)
    
    mod = 0
    mod = parren_killer("(0#{modText})") unless( modText.nil? )
    
    total, dice_str, = roll(2, 6, @sortType && 1)
    total_n = total + mod.to_i
    
    output = "#{total}[#{dice_str}]＋#{mod} → #{total_n}"
    
    if(total >= crit)
      output += " ＞ 自動成功"
    elsif(total <= fumble)
      output += " ＞ 自動失敗"
    elsif(total_n >= target)
      output += " ＞ 成功"
    else
      output += " ＞ 失敗"
    end
    
    output = "(#{string}) ＞ #{output}"
    
    return output
    
  end
  
  
  def rollTableCommand(command)
    output = ''
    type = ""
    
    case command
    when /CT/i
      type ="邂逅表"
      output, total_n = tgs_conection_table()
    when /OPR/i
      type = "オープニングチャート：リアリスティック"
      output, total_n = tgs_opening_real_table()
    when /OPC/i
      type = "オープニングチャート：シネマティック"
      output, total_n = tgs_opening_cinema_table()
    when /EDR/i
      type = "エンディングチャート：リアリスティック"
      output, total_n = tgs_ending_real_table()
    when /EDC/i
      type = "エンディングチャート：シネマティック"
      output, total_n = tgs_ending_cinema_table()
    when /OPR/i
      type = "オープニングチャート：リアリスティック"
      output, total_n = tgs_opening_real_table()
    when /RWL/i
      type = "情報収集チャート：荒野"
      output, total_n = tgs_reserch_wasteland_table()
    when /RWB/i
      type = "情報収集チャート：ウェブ"
      output, total_n = tgs_reserch_web_table()
    when /RST/i
      type = "情報収集チャート：ストリート"
      output, total_n = tgs_reserch_street_table()
    when /RUP/i
      type = "情報収集チャート：上流"
      output, total_n = tgs_reserch_upperclass_table()
    when /DCP/i
      type = "ドロップチャート：コーポレイト"
      output, total_n = tgs_drop_corporate_table()
    when /DBD/i
      type = "ドロップチャート：バンデッド"
      output, total_n = tgs_drop_bandit_table()
    when /DCR/i
      type = "ドロップチャート：クリミナル"
      output, total_n = tgs_drop_criminal_table()
    when /DNJ/i
      type = "ドロップチャート：ニンジャ"
      output, total_n = tgs_drop_ninja_table()
    when /DRB/i
      type = "ドロップチャート：ロボ"
      output, total_n = tgs_drop_robot_table()
    when /DBS/i
      type = "ドロップチャート：武装車輛"
      output, total_n = tgs_drop_busousyaryou_table()
    when /DTR/i
      type = "ドロップチャート：ターレット"
      output, total_n = tgs_drop_turret_table()
    when /DMK/i
      type = "ドロップチャート：メルカバ"
      output, total_n = tgs_drop_merkava_table()
    when /DHL/i
      type = "ドロップチャート：ヘリ"
      output, total_n = tgs_drop_heli_table()
    when /DML/i
      type = "ドロップチャート：マシンライフ"
      output, total_n = tgs_drop_machinelife_table()
    when /DZB/i
      type = "ドロップチャート：ゾンビ"
      output, total_n = tgs_drop_zombie_table()
    when /DMT/i
      type = "ドロップチャート：ミュータント"
      output, total_n = tgs_drop_mutant_table()
    when /DHR/i
      type = "ドロップチャート：BM／飛竜科"
      output, total_n = tgs_drop_hiryu_table()
    when /DKS/i
      type = "ドロップチャート：BM／巨爪科"
      output, total_n = tgs_drop_kyosou_table()
    when /DFD/i
      type = "ドロップチャート：フィーンド"
      output, total_n = tgs_drop_fiend_table()
    end
    
    output = "#{type}(#{total_n}) ＞ #{output}" if(output != '')
    
    return output
  end


  # 邂逅表(d66)[CT]
  def tgs_conection_table
    table = [
      "【関係：恩人】",
      "【関係：恩人】",
      "【関係：秘密】",
      "【関係：秘密】",
      "【関係：保護者】",
      "【関係：保護者】",
      "【関係：忠誠】",
      "【関係：忠誠】",
      "【関係：憎悪】",
      "【関係：憎悪】",
      "【関係：あこがれ】",
      "【関係：あこがれ】",
      "【関係：殺意】",
      "【関係：殺意】",
      "【関係：同志】",
      "【関係：同志】",
      "【関係：幼子】",
      "【関係：幼子】",
      "【関係：興味】",
      "【関係：興味】",
      "【関係：ライバル】",
      "【関係：ライバル】",
      "【関係：師匠】",
      "【関係：師匠】",
      "【関係：慕情】",
      "【関係：慕情】",
      "【関係：友情】",
      "【関係：友情】",
      "【関係：家族】",
      "【関係：家族】",
      "【関係：忘却】",
      "【関係：忘却】",
      "【関係：ビジネス】",
      "【関係：ビジネス】",
      "【関係：腐れ縁】",
      "【関係：腐れ縁】",
    ]
    return get_table_by_d66(table)
  end

  # オープニングチャート：リアリスティック(d66)[OPR]
  def tgs_opening_real_table
    table = [
      "おまえはめったにない休暇をエンジョイしていた。映画、デート、エステ、ドラッグ、やり方はお前の好きにしろ。",
      "おまえはめったにない休暇をエンジョイしていた。映画、デート、エステ、ドラッグ、やり方はお前の好きにしろ。",
      "おまえはめったにない休暇をエンジョイしていた。映画、デート、エステ、ドラッグ、やり方はお前の好きにしろ。",
      "おまえはちょうど一仕事やり終えたところだ。おまえがどれだけ上手くやったかは自由に演出してよいが、残念ながらこの仕事の報酬はゲーム的には価値を持たない。ライフスタイルの一部として扱う。",
      "おまえはちょうど一仕事やり終えたところだ。おまえがどれだけ上手くやったかは自由に演出してよいが、残念ながらこの仕事の報酬はゲーム的には価値を持たない。ライフスタイルの一部として扱う。",
      "おまえはちょうど一仕事やり終えたところだ。おまえがどれだけ上手くやったかは自由に演出してよいが、残念ながらこの仕事の報酬はゲーム的には価値を持たない。ライフスタイルの一部として扱う。",
      "おまえは一仕事終えてぐっすり眠っている。だがそんな時におまえを否応なく仕事の電話がたたき起こす。",
      "おまえは一仕事終えてぐっすり眠っている。だがそんな時におまえを否応なく仕事の電話がたたき起こす。",
      "おまえは一仕事終えてぐっすり眠っている。だがそんな時におまえを否応なく仕事の電話がたたき起こす。",
      "おまえは金に困っている。家賃かもしれないし、別れた配偶者からの慰謝料請求かもしれない。とにかく、このオープニングでやってくる依頼はお前にとっては渡りに船だ。なお、この金はアフタープレイの出費に含まれるためゲーム的効果を持たない。",
      "おまえは金に困っている。家賃かもしれないし、別れた配偶者からの慰謝料請求かもしれない。とにかく、このオープニングでやってくる依頼はお前にとっては渡りに船だ。なお、この金はアフタープレイの出費に含まれるためゲーム的効果を持たない。",
      "おまえは金に困っている。家賃かもしれないし、別れた配偶者からの慰謝料請求かもしれない。とにかく、このオープニングでやってくる依頼はお前にとっては渡りに船だ。なお、この金はアフタープレイの出費に含まれるためゲーム的効果を持たない。",
      "おまえは警察に不審尋問されている。そんな時、突然おまえが釈放されるという声がかかった。どうやら次の依頼人がわざわざおまえの身元を保証してくれたらしい。",
      "おまえは警察に不審尋問されている。そんな時、突然おまえが釈放されるという声がかかった。どうやら次の依頼人がわざわざおまえの身元を保証してくれたらしい。",
      "おまえは警察に不審尋問されている。そんな時、突然おまえが釈放されるという声がかかった。どうやら次の依頼人がわざわざおまえの身元を保証してくれたらしい。",
      "おまえはコネクション（任意に選択するが、困ったらライフパスの相手とせよ）と会話している。その会話の内容がどんなものかはコネクションとおまえの関係次第だ。",
      "おまえはコネクション（任意に選択するが、困ったらライフパスの相手とせよ）と会話している。その会話の内容がどんなものかはコネクションとおまえの関係次第だ。",
      "おまえはコネクション（任意に選択するが、困ったらライフパスの相手とせよ）と会話している。その会話の内容がどんなものかはコネクションとおまえの関係次第だ。",
      "おまえは家族との大切なひとときを過ごしている。もしおまえに家族というものがいないなら、かわいがっているストリートの野良犬や行きつけのバーのマスター、あるいは離婚して親権を取られた子供あたりでもいい。",
      "おまえは家族との大切なひとときを過ごしている。もしおまえに家族というものがいないなら、かわいがっているストリートの野良犬や行きつけのバーのマスター、あるいは離婚して親権を取られた子供あたりでもいい。",
      "おまえは家族との大切なひとときを過ごしている。もしおまえに家族というものがいないなら、かわいがっているストリートの野良犬や行きつけのバーのマスター、あるいは離婚して親権を取られた子供あたりでもいい。",
      "おまえはネットワークにダイブし、情報の海を思うまま経巡っている（おまえがウェットでも、ネットワークそのものは利用できることを忘れるな）。仕事の連絡があったのはそんな時だ。",
      "おまえはネットワークにダイブし、情報の海を思うまま経巡っている（おまえがウェットでも、ネットワークそのものは利用できることを忘れるな）。仕事の連絡があったのはそんな時だ。",
      "おまえはネットワークにダイブし、情報の海を思うまま経巡っている（おまえがウェットでも、ネットワークそのものは利用できることを忘れるな）。仕事の連絡があったのはそんな時だ。",
      "おまえはおまえの首を狙って名を上げようとする愚かなストリートギャングをひとり血祭りに上げたところだ。",
      "おまえはおまえの首を狙って名を上げようとする愚かなストリートギャングをひとり血祭りに上げたところだ。",
      "おまえはおまえの首を狙って名を上げようとする愚かなストリートギャングをひとり血祭りに上げたところだ。",
      "おまえは荒野をひとり旅している。ウェイストランドの自然はお前に安らぎを与えてくれるか、おまえを苦しめているかは好きにしろ、だが仕事だ。スプロールに戻る時がきた。",
      "おまえは荒野をひとり旅している。ウェイストランドの自然はお前に安らぎを与えてくれるか、おまえを苦しめているかは好きにしろ、だが仕事だ。スプロールに戻る時がきた。",
      "おまえは荒野をひとり旅している。ウェイストランドの自然はお前に安らぎを与えてくれるか、おまえを苦しめているかは好きにしろ、だが仕事だ。スプロールに戻る時がきた。",
      "おまえはごくプライベートなひとときを過ごしている。恋人との甘い一夜かもしれないし、ドラッグやアルコールの酩酊かもしれない。",
      "おまえはごくプライベートなひとときを過ごしている。恋人との甘い一夜かもしれないし、ドラッグやアルコールの酩酊かもしれない。",
      "おまえはごくプライベートなひとときを過ごしている。恋人との甘い一夜かもしれないし、ドラッグやアルコールの酩酊かもしれない。",
      "おまえは死んだ大切な人間の墓に詣でている。心の中で別れを告げたその時、依頼人から電話がかかってきた。",
      "おまえは死んだ大切な人間の墓に詣でている。心の中で別れを告げたその時、依頼人から電話がかかってきた。",
      "おまえは死んだ大切な人間の墓に詣でている。心の中で別れを告げたその時、依頼人から電話がかかってきた。",
    ]
    return get_table_by_d66(table)
  end
 
  # オープニングチャート：シネマティック(d66)[OPC]
  def tgs_opening_cinema_table
    table = [
      "おまえは世界滅亡をたくらむテロリストのアジトを今まさに木っ端微塵に爆破したところだ。脱出したおまえに、休むヒマもなく新たな依頼がやってくる。",
      "おまえは世界滅亡をたくらむテロリストのアジトを今まさに木っ端微塵に爆破したところだ。脱出したおまえに、休むヒマもなく新たな依頼がやってくる。",
      "おまえは世界滅亡をたくらむテロリストのアジトを今まさに木っ端微塵に爆破したところだ。脱出したおまえに、休むヒマもなく新たな依頼がやってくる。",
      "おまえは久しぶりに日常を楽しんでいた……はずだった。だが、おまえの乗る飛行機／船／列車がジャックされ、おまえはテロリストを徒手空拳でどうにか倒した。疲労困憊したおまえに新しい仕事がやってくる。",
      "おまえは久しぶりに日常を楽しんでいた……はずだった。だが、おまえの乗る飛行機／船／列車がジャックされ、おまえはテロリストを徒手空拳でどうにか倒した。疲労困憊したおまえに新しい仕事がやってくる。",
      "おまえは久しぶりに日常を楽しんでいた……はずだった。だが、おまえの乗る飛行機／船／列車がジャックされ、おまえはテロリストを徒手空拳でどうにか倒した。疲労困憊したおまえに新しい仕事がやってくる。",
      "おまえはまったく無関係な別の敵に捕まって拷問されている。もっとも敵はエキストラだ。おまえは自由に脱出するまでのプロセスを演出できる。",
      "おまえはまったく無関係な別の敵に捕まって拷問されている。もっとも敵はエキストラだ。おまえは自由に脱出するまでのプロセスを演出できる。",
      "おまえはまったく無関係な別の敵に捕まって拷問されている。もっとも敵はエキストラだ。おまえは自由に脱出するまでのプロセスを演出できる。",
      "おまえはムショにブチこまれている。幸いデイブレイカーだとバレてはいない。だが突然釈放の声がかかった。どうやら新しい依頼人が政治的圧力をかけたらしい。",
      "おまえはムショにブチこまれている。幸いデイブレイカーだとバレてはいない。だが突然釈放の声がかかった。どうやら新しい依頼人が政治的圧力をかけたらしい。",
      "おまえはムショにブチこまれている。幸いデイブレイカーだとバレてはいない。だが突然釈放の声がかかった。どうやら新しい依頼人が政治的圧力をかけたらしい。",
      "おまえは今まさに、暴走したバイオモンスターに喰われそうになっている。こんな時に依頼というのはどんなバカだ。おまえはこのピンチをどう切り抜けたか自由に演出できる。",
      "おまえは今まさに、暴走したバイオモンスターに喰われそうになっている。こんな時に依頼というのはどんなバカだ。おまえはこのピンチをどう切り抜けたか自由に演出できる。",
      "おまえは今まさに、暴走したバイオモンスターに喰われそうになっている。こんな時に依頼というのはどんなバカだ。おまえはこのピンチをどう切り抜けたか自由に演出できる。",
      "おまえは夢を見ていた。夢の中でおまえはまったく別の世界の、まったく別の人生を送っている。目覚めてもそちらが現実だったような気がする。まあそれはそれとして仕事だ。",
      "おまえは夢を見ていた。夢の中でおまえはまったく別の世界の、まったく別の人生を送っている。目覚めてもそちらが現実だったような気がする。まあそれはそれとして仕事だ。",
      "おまえは夢を見ていた。夢の中でおまえはまったく別の世界の、まったく別の人生を送っている。目覚めてもそちらが現実だったような気がする。まあそれはそれとして仕事だ。",
      "おまえはカジノで途方もなく大勝ちをしている。目の前にチップの山が積み上がり、支配人の顔が青くなっていく。だがその時、仕事の呼び出しがかかった。残念ながらチップを換金するヒマはない（あるいは換金出来たが、オープニングの間に使い切ったとしてもいい）。",
      "おまえはカジノで途方もなく大勝ちをしている。目の前にチップの山が積み上がり、支配人の顔が青くなっていく。だがその時、仕事の呼び出しがかかった。残念ながらチップを換金するヒマはない（あるいは換金出来たが、オープニングの間に使い切ったとしてもいい）。",
      "おまえはカジノで途方もなく大勝ちをしている。目の前にチップの山が積み上がり、支配人の顔が青くなっていく。だがその時、仕事の呼び出しがかかった。残念ながらチップを換金するヒマはない（あるいは換金出来たが、オープニングの間に使い切ったとしてもいい）。",
      "おまえは上手くやった。ネットで、リアルスペースで、芸能界で、暗黒街で、とにかくおまえのやったことは大評判を呼び、見知らぬ男たちと女たちがおまえの名を囁き交わす。そんな時におまえに依頼が来るのは当然と言えるだろう。",
      "おまえは上手くやった。ネットで、リアルスペースで、芸能界で、暗黒街で、とにかくおまえのやったことは大評判を呼び、見知らぬ男たちと女たちがおまえの名を囁き交わす。そんな時におまえに依頼が来るのは当然と言えるだろう。",
      "おまえは上手くやった。ネットで、リアルスペースで、芸能界で、暗黒街で、とにかくおまえのやったことは大評判を呼び、見知らぬ男たちと女たちがおまえの名を囁き交わす。そんな時におまえに依頼が来るのは当然と言えるだろう。",
      "おまえはヘマをやった。ポリス、情報機関、マフィア、とにかくそんなものがおまえを追い回している。おまえに依頼がやってきたのはよりによってそんな時だ。おまえは判定なしでこの窮地を切り抜けることができる。",
      "おまえはヘマをやった。ポリス、情報機関、マフィア、とにかくそんなものがおまえを追い回している。おまえに依頼がやってきたのはよりによってそんな時だ。おまえは判定なしでこの窮地を切り抜けることができる。",
      "おまえはヘマをやった。ポリス、情報機関、マフィア、とにかくそんなものがおまえを追い回している。おまえに依頼がやってきたのはよりによってそんな時だ。おまえは判定なしでこの窮地を切り抜けることができる。",
      "おまえはアイデンティティの危機に襲われる。おまえはクローンかもしれないし、記憶を継承したドロイドなのかもしれない。おまえは死んでいてネクロモーフなのかもしれない。まあそれはそれとして仕事だ。",
      "おまえはアイデンティティの危機に襲われる。おまえはクローンかもしれないし、記憶を継承したドロイドなのかもしれない。おまえは死んでいてネクロモーフなのかもしれない。まあそれはそれとして仕事だ。",
      "おまえはアイデンティティの危機に襲われる。おまえはクローンかもしれないし、記憶を継承したドロイドなのかもしれない。おまえは死んでいてネクロモーフなのかもしれない。まあそれはそれとして仕事だ。",
      "おまえは目覚めると見知らぬ異性（または同性）と同じベッドの中にいた。何事だ。まるで身に覚えがない。シャワーを浴びて部屋に戻ると、相手は忽然と煙のように消えていた。呆然とするおまえの電話が鳴る・仕事らしい。その相手と仕事が関係あるのかは、GMが決定せよ。",
      "おまえは目覚めると見知らぬ異性（または同性）と同じベッドの中にいた。何事だ。まるで身に覚えがない。シャワーを浴びて部屋に戻ると、相手は忽然と煙のように消えていた。呆然とするおまえの電話が鳴る・仕事らしい。その相手と仕事が関係あるのかは、GMが決定せよ。",
      "おまえは目覚めると見知らぬ異性（または同性）と同じベッドの中にいた。何事だ。まるで身に覚えがない。シャワーを浴びて部屋に戻ると、相手は忽然と煙のように消えていた。呆然とするおまえの電話が鳴る・仕事らしい。その相手と仕事が関係あるのかは、GMが決定せよ。",
      "おまえはショッピングモールでゾンビの大群に包囲されている。おまえは判定なしでこのゾンビパラダイスから脱出できるが、その過程をGMと協力して演出すること。",
      "おまえはショッピングモールでゾンビの大群に包囲されている。おまえは判定なしでこのゾンビパラダイスから脱出できるが、その過程をGMと協力して演出すること。",
      "おまえはショッピングモールでゾンビの大群に包囲されている。おまえは判定なしでこのゾンビパラダイスから脱出できるが、その過程をGMと協力して演出すること。",
    ]
    return get_table_by_d66(table)
  end

  # エンディングチャート：リアリスティック(d66)[EDR]
  def tgs_ending_real_table
    table = [
      "おまえは死んだ誰かの墓に詣でている。帰ってこないものは確かにあるのだ。",
      "おまえは死んだ誰かの墓に詣でている。帰ってこないものは確かにあるのだ。",
      "おまえは死んだ誰かの墓に詣でている。帰ってこないものは確かにあるのだ。",
      "おまえはいつもの日常の喧騒へと戻っていく。家賃の請求、弾薬の補充、日々の料理、トレイの掃除。まあそんなところだ。",
      "おまえはいつもの日常の喧騒へと戻っていく。家賃の請求、弾薬の補充、日々の料理、トレイの掃除。まあそんなところだ。",
      "おまえはいつもの日常の喧騒へと戻っていく。家賃の請求、弾薬の補充、日々の料理、トレイの掃除。まあそんなところだ。",
      "おまえは休暇をエンジョイしている。そこがホテルでもカジノでも、かかる費用はライフスタイルに含まれているものとする。",
      "おまえは休暇をエンジョイしている。そこがホテルでもカジノでも、かかる費用はライフスタイルに含まれているものとする。",
      "おまえは休暇をエンジョイしている。そこがホテルでもカジノでも、かかる費用はライフスタイルに含まれているものとする。",
      "おまえは恋人、あるいは別れた恋人との親密な時間を過ごしている。それが甘い語らいなのか、深刻な別れ話まのかは好きにするといい。",
      "おまえは恋人、あるいは別れた恋人との親密な時間を過ごしている。それが甘い語らいなのか、深刻な別れ話まのかは好きにするといい。",
      "おまえは恋人、あるいは別れた恋人との親密な時間を過ごしている。それが甘い語らいなのか、深刻な別れ話まのかは好きにするといい。",
      "おまえは今回の事件について、おまえのコネクションと会話している。コネクションがおまえと事件をどう思っているかは、GMと相談しろ。",
      "おまえは今回の事件について、おまえのコネクションと会話している。コネクションがおまえと事件をどう思っているかは、GMと相談しろ。",
      "おまえは今回の事件について、おまえのコネクションと会話している。コネクションがおまえと事件をどう思っているかは、GMと相談しろ。",
      "おまえは日常的な銃と硝煙の世界へ戻っていく。幸い、この荒廃世界では敵には事欠かない。違うか？",
      "おまえは日常的な銃と硝煙の世界へ戻っていく。幸い、この荒廃世界では敵には事欠かない。違うか？",
      "おまえは日常的な銃と硝煙の世界へ戻っていく。幸い、この荒廃世界では敵には事欠かない。違うか？",
      "おまえはウェイストランドに残された自然の中を歩いて行く。おまえはそこでスプロールよりも大切なものを見いだすのかもしれない。あるいはただ、冒険の一環なのかもしれない。",
      "おまえはウェイストランドに残された自然の中を歩いて行く。おまえはそこでスプロールよりも大切なものを見いだすのかもしれない。あるいはただ、冒険の一環なのかもしれない。",
      "おまえはウェイストランドに残された自然の中を歩いて行く。おまえはそこでスプロールよりも大切なものを見いだすのかもしれない。あるいはただ、冒険の一環なのかもしれない。",
      "おまえはドラッグ／美食／酒／タバコ／ロマンスのもたらす悦楽に心ゆくまで浸っている。おまえは立派に仕事をやりとげた。当分は動きたくない。",
      "おまえはドラッグ／美食／酒／タバコ／ロマンスのもたらす悦楽に心ゆくまで浸っている。おまえは立派に仕事をやりとげた。当分は動きたくない。",
      "おまえはドラッグ／美食／酒／タバコ／ロマンスのもたらす悦楽に心ゆくまで浸っている。おまえは立派に仕事をやりとげた。当分は動きたくない。",
      "おまえはトレーニングに励んでいる。ひとつの戦いは終わった。だがこの先にはさらなる戦いが待っている。そのときのために、鍛錬は必要なのだ。",
      "おまえはトレーニングに励んでいる。ひとつの戦いは終わった。だがこの先にはさらなる戦いが待っている。そのときのために、鍛錬は必要なのだ。",
      "おまえはトレーニングに励んでいる。ひとつの戦いは終わった。だがこの先にはさらなる戦いが待っている。そのときのために、鍛錬は必要なのだ。",
      "おまえは株式投資や新興宗教の教祖といった「副業」に精を出している。それによって儲かっているにせよ儲かっていないにせよ、ゲームデータとしての金には影響しない。",
      "おまえは株式投資や新興宗教の教祖といった「副業」に精を出している。それによって儲かっているにせよ儲かっていないにせよ、ゲームデータとしての金には影響しない。",
      "おまえは株式投資や新興宗教の教祖といった「副業」に精を出している。それによって儲かっているにせよ儲かっていないにせよ、ゲームデータとしての金には影響しない。",
      "おまえは新しいミッションを受けている。それがどのようなものか今決めてもいいし、次のシナリオの題材にしてもいい。",
      "おまえは新しいミッションを受けている。それがどのようなものか今決めてもいいし、次のシナリオの題材にしてもいい。",
      "おまえは新しいミッションを受けている。それがどのようなものか今決めてもいいし、次のシナリオの題材にしてもいい。",
      "おまえは家族と過ごしている。家族と呼べる相手がいないなら、近所の野良猫でも行きつけのバーのマスターでもいいだろう。",
      "おまえは家族と過ごしている。家族と呼べる相手がいないなら、近所の野良猫でも行きつけのバーのマスターでもいいだろう。",
      "おまえは家族と過ごしている。家族と呼べる相手がいないなら、近所の野良猫でも行きつけのバーのマスターでもいいだろう。",
    ]
    return get_table_by_d66(table)
  end
 
  # エンディングチャート：シネマティック(d66)[EDC]
  def tgs_ending_cinema_table
    table = [
      "おまえは自分がアンドロイドであり、自分を人間だと思い込んでいたことを突如として思い出す。そしておまえには、おまえを追う刺客が迫っている。",
      "おまえは自分がアンドロイドであり、自分を人間だと思い込んでいたことを突如として思い出す。そしておまえには、おまえを追う刺客が迫っている。",
      "おまえは自分がアンドロイドであり、自分を人間だと思い込んでいたことを突如として思い出す。そしておまえには、おまえを追う刺客が迫っている。",
      "おまえはこのシナリオの記憶がまったく存在しないことを思い出す。あるいは記憶だと思っていたものは、VRで植え付けられた偽記憶だったのかもしれない。おまえが誰かを探す旅が今始まる。",
      "おまえはこのシナリオの記憶がまったく存在しないことを思い出す。あるいは記憶だと思っていたものは、VRで植え付けられた偽記憶だったのかもしれない。おまえが誰かを探す旅が今始まる。",
      "おまえはこのシナリオの記憶がまったく存在しないことを思い出す。あるいは記憶だと思っていたものは、VRで植え付けられた偽記憶だったのかもしれない。おまえが誰かを探す旅が今始まる。",
      "おまえは平和な日常に戻っていく。ところで画面が切り替わり、BOSSの墓が映る。墓が不気味に蠢いてシーンエンド。",
      "おまえは平和な日常に戻っていく。ところで画面が切り替わり、BOSSの墓が映る。墓が不気味に蠢いてシーンエンド。",
      "おまえは平和な日常に戻っていく。ところで画面が切り替わり、BOSSの墓が映る。墓が不気味に蠢いてシーンエンド。",
      "なんとめでたいことに、名前を聞いたこともない遠縁の親戚の遺産がころがりこむ。スプロールの外れた洋館で魔術の研究をしていたらしい。おまえは遺産を受け継ぐため嵐の洋館へ向かっていく。",
      "なんとめでたいことに、名前を聞いたこともない遠縁の親戚の遺産がころがりこむ。スプロールの外れた洋館で魔術の研究をしていたらしい。おまえは遺産を受け継ぐため嵐の洋館へ向かっていく。",
      "なんとめでたいことに、名前を聞いたこともない遠縁の親戚の遺産がころがりこむ。スプロールの外れた洋館で魔術の研究をしていたらしい。おまえは遺産を受け継ぐため嵐の洋館へ向かっていく。",
      "おまえは悪の黒幕（このシナリオの黒幕とは限らない）拳／拳銃／カタナの一撃で倒し、立ち去っていく。背後で大爆発。悪は滅んだ。",
      "おまえは悪の黒幕（このシナリオの黒幕とは限らない）拳／拳銃／カタナの一撃で倒し、立ち去っていく。背後で大爆発。悪は滅んだ。",
      "おまえは悪の黒幕（このシナリオの黒幕とは限らない）拳／拳銃／カタナの一撃で倒し、立ち去っていく。背後で大爆発。悪は滅んだ。",
      "おまえは有名になりすぎた。お前を殺すために暗黒街が、メガ・コーポが、最強の刺客軍団を送り込んでくる。無論全員エキストラだ。お前が好き放題倒したら、シーンを終了させろ。",
      "おまえは有名になりすぎた。お前を殺すために暗黒街が、メガ・コーポが、最強の刺客軍団を送り込んでくる。無論全員エキストラだ。お前が好き放題倒したら、シーンを終了させろ。",
      "おまえは有名になりすぎた。お前を殺すために暗黒街が、メガ・コーポが、最強の刺客軍団を送り込んでくる。無論全員エキストラだ。お前が好き放題倒したら、シーンを終了させろ。",
      "おまえはウェイストランドを探検し、ついに誰もたどりついたことのない秘境の都市を発見した。そこに何が眠っているのか。おまえはただひとり、都市へと向かう……！",
      "おまえはウェイストランドを探検し、ついに誰もたどりついたことのない秘境の都市を発見した。そこに何が眠っているのか。おまえはただひとり、都市へと向かう……！",
      "おまえはウェイストランドを探検し、ついに誰もたどりついたことのない秘境の都市を発見した。そこに何が眠っているのか。おまえはただひとり、都市へと向かう……！",
      "おまえはおまえはようやく平穏な日常に戻って来た。のんびり過ごそうとした海岸のリゾートで悲鳴が上がる。なんてことだ！　ゾンビ化した巨大鮫の襲撃だ！　畜生！",
      "おまえはおまえはようやく平穏な日常に戻って来た。のんびり過ごそうとした海岸のリゾートで悲鳴が上がる。なんてことだ！　ゾンビ化した巨大鮫の襲撃だ！　畜生！",
      "おまえはおまえはようやく平穏な日常に戻って来た。のんびり過ごそうとした海岸のリゾートで悲鳴が上がる。なんてことだ！　ゾンビ化した巨大鮫の襲撃だ！　畜生！",
      "おまえはストリートの闇へ戻っていく。おまえのコネクションがおまえに囁く。「どうやらBOSSが全身をサイバーウェアでつなぎ止め、復活しておまえへの復讐を企んでいるらしいぞ」その言葉に、おまえは……。",
      "おまえはストリートの闇へ戻っていく。おまえのコネクションがおまえに囁く。「どうやらBOSSが全身をサイバーウェアでつなぎ止め、復活しておまえへの復讐を企んでいるらしいぞ」その言葉に、おまえは……。",
      "おまえはストリートの闇へ戻っていく。おまえのコネクションがおまえに囁く。「どうやらBOSSが全身をサイバーウェアでつなぎ止め、復活しておまえへの復讐を企んでいるらしいぞ」その言葉に、おまえは……。",
      "今やストリートの伝説になったおまえには、密かにクローンが作り出されていた。対決する本人とクローン！　激震する暗黒街！　勝つのはどちらだ！　待て、次回！",
      "今やストリートの伝説になったおまえには、密かにクローンが作り出されていた。対決する本人とクローン！　激震する暗黒街！　勝つのはどちらだ！　待て、次回！",
      "今やストリートの伝説になったおまえには、密かにクローンが作り出されていた。対決する本人とクローン！　激震する暗黒街！　勝つのはどちらだ！　待て、次回！",
      "倒したはずの宿敵（今回のBOSSとは限らない）がゾンビになって復活した。なんてしぶとい野郎だ。おまえはチェーンソーを手に立ち向かう。",
      "倒したはずの宿敵（今回のBOSSとは限らない）がゾンビになって復活した。なんてしぶとい野郎だ。おまえはチェーンソーを手に立ち向かう。",
      "倒したはずの宿敵（今回のBOSSとは限らない）がゾンビになって復活した。なんてしぶとい野郎だ。おまえはチェーンソーを手に立ち向かう。",
      "仕事を終えてねぐらに戻ろうとするおまえを光が包み込んだ。UFOのアブダクションだ。果たしておまえの運命はどうなるのか。収拾がつかなくなった場合、夢だったことにするといい。",
      "仕事を終えてねぐらに戻ろうとするおまえを光が包み込んだ。UFOのアブダクションだ。果たしておまえの運命はどうなるのか。収拾がつかなくなった場合、夢だったことにするといい。",
      "仕事を終えてねぐらに戻ろうとするおまえを光が包み込んだ。UFOのアブダクションだ。果たしておまえの運命はどうなるのか。収拾がつかなくなった場合、夢だったことにするといい。",
    ]
    return get_table_by_d66(table)
  end

  # 情報収集チャート：荒野(d66)[RWL]
  def tgs_reserch_wasteland_table
    table = [
      "どこまでも続く果てしない荒野と廃墟、かつてここに文明があったというのが信じられれない。あるいはあの輻輳都市が蜃気楼なのかもしれない。",
      "どこまでも続く果てしない荒野と廃墟、かつてここに文明があったというのが信じられれない。あるいはあの輻輳都市が蜃気楼なのかもしれない。",
      "どこまでも続く果てしない荒野と廃墟、かつてここに文明があったというのが信じられれない。あるいはあの輻輳都市が蜃気楼なのかもしれない。",
      "どこかのバカが仕掛けた地雷が埋まっている！　【反射】難易度12の判定を行ない、失敗すれば〈殴〉5D＋総合レベルのダメージを受ける。",
      "どこかのバカが仕掛けた地雷が埋まっている！　【反射】難易度12の判定を行ない、失敗すれば〈殴〉5D＋総合レベルのダメージを受ける。",
      "どこかのバカが仕掛けた地雷が埋まっている！　【反射】難易度12の判定を行ない、失敗すれば〈殴〉5D＋総合レベルのダメージを受ける。",
      "まともに説明したらリプレイ一冊分になるような冒険の果て、お前は情報提供者のところにたどり着いた。【HP】を（総合レベル）D点失う。",
      "まともに説明したらリプレイ一冊分になるような冒険の果て、お前は情報提供者のところにたどり着いた。【HP】を（総合レベル）D点失う。",
      "まともに説明したらリプレイ一冊分になるような冒険の果て、お前は情報提供者のところにたどり着いた。【HP】を（総合レベル）D点失う。",
      "伝説の白いワニだ！　なぜワニがこんな下水道に！?　【体力】難易度12の判定を行ない、成功すれば威信点1を得る。失敗なら、〈斬〉10Dダメージ。",
      "伝説の白いワニだ！　なぜワニがこんな下水道に！?　【体力】難易度12の判定を行ない、成功すれば威信点1を得る。失敗なら、〈斬〉10Dダメージ。",
      "伝説の白いワニだ！　なぜワニがこんな下水道に！?　【体力】難易度12の判定を行ない、成功すれば威信点1を得る。失敗なら、〈斬〉10Dダメージ。",
      "山間の峠を抜けると、素晴らしく美しい湖と草原に出た。まだこんな自然が残っていたのか。おまえの【MP】を完全に回復する。",
      "山間の峠を抜けると、素晴らしく美しい湖と草原に出た。まだこんな自然が残っていたのか。おまえの【MP】を完全に回復する。",
      "山間の峠を抜けると、素晴らしく美しい湖と草原に出た。まだこんな自然が残っていたのか。おまえの【MP】を完全に回復する。",
      "たどりついた村人の親切な歓待。とっておきの肉のシチューを振る舞われる。【体力】難易度12の判定を行ない、成功すれば【HP】【MP】が完全に回復。失敗なら、【HP】を5D点失う。",
      "たどりついた村人の親切な歓待。とっておきの肉のシチューを振る舞われる。【体力】難易度12の判定を行ない、成功すれば【HP】【MP】が完全に回復。失敗なら、【HP】を5D点失う。",
      "たどりついた村人の親切な歓待。とっておきの肉のシチューを振る舞われる。【体力】難易度12の判定を行ない、成功すれば【HP】【MP】が完全に回復。失敗なら、【HP】を5D点失う。",
      "フェリシア・リーの行商。おまえは購入難易度20以下のアイテムひとつを定価で購入してもよい（情報収集とは別に行なえる）。",
      "フェリシア・リーの行商。おまえは購入難易度20以下のアイテムひとつを定価で購入してもよい（情報収集とは別に行なえる）。",
      "フェリシア・リーの行商。おまえは購入難易度20以下のアイテムひとつを定価で購入してもよい（情報収集とは別に行なえる）。",
      "バイオモンスターに襲われたらしい死体を発見する。端末で照合すると賞金首らしい。おまえが倒したことにするなら、威信点2を失い、$5000を得る。",
      "バイオモンスターに襲われたらしい死体を発見する。端末で照合すると賞金首らしい。おまえが倒したことにするなら、威信点2を失い、$5000を得る。",
      "バイオモンスターに襲われたらしい死体を発見する。端末で照合すると賞金首らしい。おまえが倒したことにするなら、威信点2を失い、$5000を得る。",
      "情報は古い機械式の金庫に収められていた。【反射】難易度12の判定を行ない、成功なら次の情報収集＋2（クリティカルなら＋$500）。失敗なら金庫が自爆し、次の情報収集－2。",
      "情報は古い機械式の金庫に収められていた。【反射】難易度12の判定を行ない、成功なら次の情報収集＋2（クリティカルなら＋$500）。失敗なら金庫が自爆し、次の情報収集－2。",
      "情報は古い機械式の金庫に収められていた。【反射】難易度12の判定を行ない、成功なら次の情報収集＋2（クリティカルなら＋$500）。失敗なら金庫が自爆し、次の情報収集－2。",
      "なんてこった、ゾンビの襲撃だ！　「種別：ゾンビ」で、おまえがもっともレベルの近いエネミー1D体がおまえを襲撃する。登場難易度の12のシーンで戦闘を行なうこと。距離は2マス。",
      "なんてこった、ゾンビの襲撃だ！　「種別：ゾンビ」で、おまえがもっともレベルの近いエネミー1D体がおまえを襲撃する。登場難易度の12のシーンで戦闘を行なうこと。距離は2マス。",
      "なんてこった、ゾンビの襲撃だ！　「種別：ゾンビ」で、おまえがもっともレベルの近いエネミー1D体がおまえを襲撃する。登場難易度の12のシーンで戦闘を行なうこと。距離は2マス。",
      "旧時代の知識を持つ親切なロボットがおまえの手助けをしてくれた。次の情報収集に＋2。",
      "旧時代の知識を持つ親切なロボットがおまえの手助けをしてくれた。次の情報収集に＋2。",
      "旧時代の知識を持つ親切なロボットがおまえの手助けをしてくれた。次の情報収集に＋2。",
      "墜落したUFOを発見する。おまえは見なかったことにしてもよいし、雑誌社に売りつけてもよい。売りつけるなら、1D66×100$を得る。",
      "墜落したUFOを発見する。おまえは見なかったことにしてもよいし、雑誌社に売りつけてもよい。売りつけるなら、1D66×100$を得る。",
      "墜落したUFOを発見する。おまえは見なかったことにしてもよいし、雑誌社に売りつけてもよい。売りつけるなら、1D66×100$を得る。",
    ]
    return get_table_by_d66(table)
  end

  # 情報収集チャート：ウェブ(d66)[RWB]
  def tgs_reserch_web_table
    table = [
      "特に何事もない。ネットの世界はルーチンワークだ。おまえは粛々と情報を集めていく。",
      "特に何事もない。ネットの世界はルーチンワークだ。おまえは粛々と情報を集めていく。",
      "特に何事もない。ネットの世界はルーチンワークだ。おまえは粛々と情報を集めていく。",
      "まさにおまえが必要としている情報の入ったファイルが、データ流の中を漂流していく。冗談か？　【幸運】難易度12の判定を行ない、成功すれば情報収集の達成値＋2。ファンブルなら、情報収集そのものも失敗する。",
      "まさにおまえが必要としている情報の入ったファイルが、データ流の中を漂流していく。冗談か？　【幸運】難易度12の判定を行ない、成功すれば情報収集の達成値＋2。ファンブルなら、情報収集そのものも失敗する。",
      "まさにおまえが必要としている情報の入ったファイルが、データ流の中を漂流していく。冗談か？　【幸運】難易度12の判定を行ない、成功すれば情報収集の達成値＋2。ファンブルなら、情報収集そのものも失敗する。",
      "コネクションのひとりからVRチャットのお誘い。どうやらまったく無関係に、ヤツは君と世間話がしたいようだ。だが、何か関連情報を知っているかもしれないぞ。【幸運】難易度12の判定を行ない、成功すれば情報収集の達成値＋1。クリティカルなら、威信点にも＋1。",
      "コネクションのひとりからVRチャットのお誘い。どうやらまったく無関係に、ヤツは君と世間話がしたいようだ。だが、何か関連情報を知っているかもしれないぞ。【幸運】難易度12の判定を行ない、成功すれば情報収集の達成値＋1。クリティカルなら、威信点にも＋1。",
      "コネクションのひとりからVRチャットのお誘い。どうやらまったく無関係に、ヤツは君と世間話がしたいようだ。だが、何か関連情報を知っているかもしれないぞ。【幸運】難易度12の判定を行ない、成功すれば情報収集の達成値＋1。クリティカルなら、威信点にも＋1。",
      "おまえはネットの海に果てしなく潜り続ける。無数の情報がお前を魅惑し幻惑する。お前は万能だ。だが現実の肉体はそうではない。【体力】難易度12の判定を行ない、成失敗すると3D＋キャラクターレベル点のHPを失う。ファンブルならその二倍だ。",
      "おまえはネットの海に果てしなく潜り続ける。無数の情報がお前を魅惑し幻惑する。お前は万能だ。だが現実の肉体はそうではない。【体力】難易度12の判定を行ない、成失敗すると3D＋キャラクターレベル点のHPを失う。ファンブルならその二倍だ。",
      "おまえはネットの海に果てしなく潜り続ける。無数の情報がお前を魅惑し幻惑する。お前は万能だ。だが現実の肉体はそうではない。【体力】難易度12の判定を行ない、成失敗すると3D＋キャラクターレベル点のHPを失う。ファンブルならその二倍だ。",
      "目当ての情報に近いファイルを見つけた……。だが、それには悪質な電脳ドラッグの“お試し”データが仕込まれていた。【意志】難易度12の判定を行ない、失敗した場合、次のシーンの開始時、お前は狼狽・放心を受ける。",
      "目当ての情報に近いファイルを見つけた……。だが、それには悪質な電脳ドラッグの“お試し”データが仕込まれていた。【意志】難易度12の判定を行ない、失敗した場合、次のシーンの開始時、お前は狼狽・放心を受ける。",
      "目当ての情報に近いファイルを見つけた……。だが、それには悪質な電脳ドラッグの“お試し”データが仕込まれていた。【意志】難易度12の判定を行ない、失敗した場合、次のシーンの開始時、お前は狼狽・放心を受ける。",
      "「ああ、その件なら知っているよ」お前のツレのハッカーが、そのネタを知っているらしい。しかもオープンソース精神とやらで、金はいらないそうだ。情報収集の達成値＋2。",
      "「ああ、その件なら知っているよ」お前のツレのハッカーが、そのネタを知っているらしい。しかもオープンソース精神とやらで、金はいらないそうだ。情報収集の達成値＋2。",
      "「ああ、その件なら知っているよ」お前のツレのハッカーが、そのネタを知っているらしい。しかもオープンソース精神とやらで、金はいらないそうだ。情報収集の達成値＋2。",
      "どうやらおまえが貸しを作っているライバルのハッカーが、お前の追っている事件についてのネタを握っているらしい。威信点を1点減らすなら、次の情報収集のクリティカル値を－2（下限値8）。",
      "どうやらおまえが貸しを作っているライバルのハッカーが、お前の追っている事件についてのネタを握っているらしい。威信点を1点減らすなら、次の情報収集のクリティカル値を－2（下限値8）。",
      "どうやらおまえが貸しを作っているライバルのハッカーが、お前の追っている事件についてのネタを握っているらしい。威信点を1点減らすなら、次の情報収集のクリティカル値を－2（下限値8）。",
      "高速化された論理迷路の仕掛けられたデータストアに迷い込む。これだけ厳重な防御があるということは、核心の情報が保管されている可能性が高い。【知覚】難易度12の判定を行ない、成功すれば情報収集の達成値＋2。失敗なら、－2。",
      "高速化された論理迷路の仕掛けられたデータストアに迷い込む。これだけ厳重な防御があるということは、核心の情報が保管されている可能性が高い。【知覚】難易度12の判定を行ない、成功すれば情報収集の達成値＋2。失敗なら、－2。",
      "高速化された論理迷路の仕掛けられたデータストアに迷い込む。これだけ厳重な防御があるということは、核心の情報が保管されている可能性が高い。【知覚】難易度12の判定を行ない、成功すれば情報収集の達成値＋2。失敗なら、－2。",
      "目まぐるしい映像の洪水が流れて行く。ネットはいつでも広告と無縁ではいられない。お前はその中から、有用そうなデータをいくつか集めた。このシナリオ中、おまえの購入判定のクリティカル値を－1（下限値8）。",
      "目まぐるしい映像の洪水が流れて行く。ネットはいつでも広告と無縁ではいられない。お前はその中から、有用そうなデータをいくつか集めた。このシナリオ中、おまえの購入判定のクリティカル値を－1（下限値8）。",
      "目まぐるしい映像の洪水が流れて行く。ネットはいつでも広告と無縁ではいられない。お前はその中から、有用そうなデータをいくつか集めた。このシナリオ中、おまえの購入判定のクリティカル値を－1（下限値8）。",
      "「最高のエクスタシー。肉体を捨てたトランスヒューマンだけの、嗜好の悦楽……」VRドラッグの試供品をもらう。おまえがウェットでないなら、【MP】を3D＋総合レベル点回復すること。",
      "「最高のエクスタシー。肉体を捨てたトランスヒューマンだけの、嗜好の悦楽……」VRドラッグの試供品をもらう。おまえがウェットでないなら、【MP】を3D＋総合レベル点回復すること。",
      "「最高のエクスタシー。肉体を捨てたトランスヒューマンだけの、嗜好の悦楽……」VRドラッグの試供品をもらう。おまえがウェットでないなら、【MP】を3D＋総合レベル点回復すること。",
      "おまえの個人情報がタレ流しになっていることに気付く。どこかのバカのいやがらせだ。だが、うまく処理できれば名が上がる。【理知】難易度12の判定を行ない、成功すれば威信点＋1。失敗なら－1。",
      "おまえの個人情報がタレ流しになっていることに気付く。どこかのバカのいやがらせだ。だが、うまく処理できれば名が上がる。【理知】難易度12の判定を行ない、成功すれば威信点＋1。失敗なら－1。",
      "おまえの個人情報がタレ流しになっていることに気付く。どこかのバカのいやがらせだ。だが、うまく処理できれば名が上がる。【理知】難易度12の判定を行ない、成功すれば威信点＋1。失敗なら－1。",
      "どうやら目当ての情報は、まだ誰も破ったことのないデータストアに保管されているようだ。それを破ったとなれば、間違いなくおまえのハッカーとしての名は上がる。次の情報収集判定に成功した場合、威信点＋1D。",
      "どうやら目当ての情報は、まだ誰も破ったことのないデータストアに保管されているようだ。それを破ったとなれば、間違いなくおまえのハッカーとしての名は上がる。次の情報収集判定に成功した場合、威信点＋1D。",
      "どうやら目当ての情報は、まだ誰も破ったことのないデータストアに保管されているようだ。それを破ったとなれば、間違いなくおまえのハッカーとしての名は上がる。次の情報収集判定に成功した場合、威信点＋1D。",
    ]
    return get_table_by_d66(table)
  end

  # 情報収集チャート：ストリート(d66)[RST]
  def tgs_reserch_street_table
    table = [
      "特筆すべき出来事はない。降り止まない酸性雨、うつむきがちの人々、けばけばしいネオンに広告飛行船。今日はいつも通りの日常だ。",
      "特筆すべき出来事はない。降り止まない酸性雨、うつむきがちの人々、けばけばしいネオンに広告飛行船。今日はいつも通りの日常だ。",
      "特筆すべき出来事はない。降り止まない酸性雨、うつむきがちの人々、けばけばしいネオンに広告飛行船。今日はいつも通りの日常だ。",
      "「てめえを殺りゃあ、幹部なんだよ！」密造拳銃を手にしたチンピラの襲撃。情報源のお出ましだ。【反射】難易度12の判定に成功すれば、情報収集の達成値＋2。失敗なら、〈殴〉3D＋総合レベル点のダメージを受ける。",
      "「てめえを殺りゃあ、幹部なんだよ！」密造拳銃を手にしたチンピラの襲撃。情報源のお出ましだ。【反射】難易度12の判定に成功すれば、情報収集の達成値＋2。失敗なら、〈殴〉3D＋総合レベル点のダメージを受ける。",
      "「てめえを殺りゃあ、幹部なんだよ！」密造拳銃を手にしたチンピラの襲撃。情報源のお出ましだ。【反射】難易度12の判定に成功すれば、情報収集の達成値＋2。失敗なら、〈殴〉3D＋総合レベル点のダメージを受ける。",
      "「よぉ。あのネタ探してんだってな？」にやにや顏の悪徳警官のお出ましだ。威信点を1点消費するなら、通常の効果に加えて達成値＋2（合計＋4）。",
      "「よぉ。あのネタ探してんだってな？」にやにや顏の悪徳警官のお出ましだ。威信点を1点消費するなら、通常の効果に加えて達成値＋2（合計＋4）。",
      "「よぉ。あのネタ探してんだってな？」にやにや顏の悪徳警官のお出ましだ。威信点を1点消費するなら、通常の効果に加えて達成値＋2（合計＋4）。",
      "「あんたとは終わったはずよ」昔の恋人と出会う（心当たりがない。とおまえが言うなら、このイベントはスキップ。ダイス目11として扱う）。威信点を1点消費するなら、通常の効果に加えてクリティカル値－2（下限値8）。",
      "「あんたとは終わったはずよ」昔の恋人と出会う（心当たりがない。とおまえが言うなら、このイベントはスキップ。ダイス目11として扱う）。威信点を1点消費するなら、通常の効果に加えてクリティカル値－2（下限値8）。",
      "「あんたとは終わったはずよ」昔の恋人と出会う（心当たりがない。とおまえが言うなら、このイベントはスキップ。ダイス目11として扱う）。威信点を1点消費するなら、通常の効果に加えてクリティカル値－2（下限値8）。",
      "とにかく足で稼ぐしかなさそうだ。結局、この時代でも最後に頼れるのはそれだけだ。【体力】難易度12の判定を行ない、成功すると情報収集の達成値＋2。",
      "とにかく足で稼ぐしかなさそうだ。結局、この時代でも最後に頼れるのはそれだけだ。【体力】難易度12の判定を行ない、成功すると情報収集の達成値＋2。",
      "とにかく足で稼ぐしかなさそうだ。結局、この時代でも最後に頼れるのはそれだけだ。【体力】難易度12の判定を行ない、成功すると情報収集の達成値＋2。",
      "なじみの店でコネクションと出会う。敵対的な関係でないなら、快く情報を伝えてくれる。情報収集の達成値＋2。敵対的な関係の場合は、ダイス目21と同様の処理。",
      "なじみの店でコネクションと出会う。敵対的な関係でないなら、快く情報を伝えてくれる。情報収集の達成値＋2。敵対的な関係の場合は、ダイス目21と同様の処理。",
      "なじみの店でコネクションと出会う。敵対的な関係でないなら、快く情報を伝えてくれる。情報収集の達成値＋2。敵対的な関係の場合は、ダイス目21と同様の処理。",
      "「最近名前が売れてるらしいじゃねえか。相棒（チューマ）」知らないやつになれなれしく話しかけられた。【理知】難易度12でうまくあしらえ。成功すれば、威信点＋2。",
      "「最近名前が売れてるらしいじゃねえか。相棒（チューマ）」知らないやつになれなれしく話しかけられた。【理知】難易度12でうまくあしらえ。成功すれば、威信点＋2。",
      "「最近名前が売れてるらしいじゃねえか。相棒（チューマ）」知らないやつになれなれしく話しかけられた。【理知】難易度12でうまくあしらえ。成功すれば、威信点＋2。",
      "情報収集の過程で、まったく無関係な賞金首に襲われて返り討ちに。1D×500$を得るが、時間を取られたので、情報収集の達成値－1。",
      "情報収集の過程で、まったく無関係な賞金首に襲われて返り討ちに。1D×500$を得るが、時間を取られたので、情報収集の達成値－1。",
      "情報収集の過程で、まったく無関係な賞金首に襲われて返り討ちに。1D×500$を得るが、時間を取られたので、情報収集の達成値－1。",
      "屋台から漂ってくる聞いたこともない料理の香り。実に旨そうだ。5$払って食べてもいい。その場合、【幸運】難易度12の判定を行ない、成功すると【HP】と【MP】が全回復する。失敗すると、あまりのまずさに【MP】を2D点失う。",
      "屋台から漂ってくる聞いたこともない料理の香り。実に旨そうだ。5$払って食べてもいい。その場合、【幸運】難易度12の判定を行ない、成功すると【HP】と【MP】が全回復する。失敗すると、あまりのまずさに【MP】を2D点失う。",
      "屋台から漂ってくる聞いたこともない料理の香り。実に旨そうだ。5$払って食べてもいい。その場合、【幸運】難易度12の判定を行ない、成功すると【HP】と【MP】が全回復する。失敗すると、あまりのまずさに【MP】を2D点失う。",
      "抗争に巻き込まれて大ケガを負った子供と知り合う。何らかの【HP】回復を施してやる（アイテムを渡すのでもいい）のなら、威信点1点を得る。",
      "抗争に巻き込まれて大ケガを負った子供と知り合う。何らかの【HP】回復を施してやる（アイテムを渡すのでもいい）のなら、威信点1点を得る。",
      "抗争に巻き込まれて大ケガを負った子供と知り合う。何らかの【HP】回復を施してやる（アイテムを渡すのでもいい）のなら、威信点1点を得る。",
      "「あんたの名前に見合った金をはずんでくれよ。チューマ」情報屋だ。総合レベルの二乗×$100を支払えば、情報収集判定の達成値に＋4。",
      "「あんたの名前に見合った金をはずんでくれよ。チューマ」情報屋だ。総合レベルの二乗×$100を支払えば、情報収集判定の達成値に＋4。",
      "「あんたの名前に見合った金をはずんでくれよ。チューマ」情報屋だ。総合レベルの二乗×$100を支払えば、情報収集判定の達成値に＋4。",
      "なんてこった、ゾンビの襲撃だ！　「種別：ゾンビ」で、おまえともっともレベルの近いエネミー1D体がおまえを襲撃する。登場難易度12のシーンで戦闘を行なうこと。距離は2マス。",
      "なんてこった、ゾンビの襲撃だ！　「種別：ゾンビ」で、おまえともっともレベルの近いエネミー1D体がおまえを襲撃する。登場難易度12のシーンで戦闘を行なうこと。距離は2マス。",
      "なんてこった、ゾンビの襲撃だ！　「種別：ゾンビ」で、おまえともっともレベルの近いエネミー1D体がおまえを襲撃する。登場難易度12のシーンで戦闘を行なうこと。距離は2マス。",
    ]
    return get_table_by_d66(table)
  end

  # 情報収集チャート：上流(d66)[RUP]
  def tgs_reserch_upperclass_table
    table = [
      "実を伴わない会話、豪勢な食事、最新鋭の何だか分からないファッション、そしてパーティ！　世はすべて事もなし。",
      "実を伴わない会話、豪勢な食事、最新鋭の何だか分からないファッション、そしてパーティ！　世はすべて事もなし。",
      "実を伴わない会話、豪勢な食事、最新鋭の何だか分からないファッション、そしてパーティ！　世はすべて事もなし。",
      "きらびやかな夜会と社交界の世界では、現金の量になど価値はない。金はあって当然だからだ。問題になるのは、おまえがどれだけのセレブかだ。1Dし、その数値がおまえの現在の威信点以下なら、次の情報収集に＋2。",
      "きらびやかな夜会と社交界の世界では、現金の量になど価値はない。金はあって当然だからだ。問題になるのは、おまえがどれだけのセレブかだ。1Dし、その数値がおまえの現在の威信点以下なら、次の情報収集に＋2。",
      "きらびやかな夜会と社交界の世界では、現金の量になど価値はない。金はあって当然だからだ。問題になるのは、おまえがどれだけのセレブかだ。1Dし、その数値がおまえの現在の威信点以下なら、次の情報収集に＋2。",
      "ポストヒューマンと呼べなくても、トランスヒューマンであるかどうか。それが上流社会に受け入れられるための最低条件だ。おまえがウェットの場合、次の情報収集に－4。",
      "ポストヒューマンと呼べなくても、トランスヒューマンであるかどうか。それが上流社会に受け入れられるための最低条件だ。おまえがウェットの場合、次の情報収集に－4。",
      "ポストヒューマンと呼べなくても、トランスヒューマンであるかどうか。それが上流社会に受け入れられるための最低条件だ。おまえがウェットの場合、次の情報収集に－4。",
      "おまえを値踏みするセレブたちの冷たい視線。おまえの生活費が$1,500未満なら、次の情報収集に－2。おまえの生活費が$4000以上なら、＋2。",
      "おまえを値踏みするセレブたちの冷たい視線。おまえの生活費が$1,500未満なら、次の情報収集に－2。おまえの生活費が$4000以上なら、＋2。",
      "おまえを値踏みするセレブたちの冷たい視線。おまえの生活費が$1,500未満なら、次の情報収集に－2。おまえの生活費が$4000以上なら、＋2。",
      "「あなたの噂は聞いていますわ、ご活躍だそうね」相手はどうもおまえを知っていて、しかも好意的らしい。ありがたく話を聞く。威信点に＋1。",
      "「あなたの噂は聞いていますわ、ご活躍だそうね」相手はどうもおまえを知っていて、しかも好意的らしい。ありがたく話を聞く。威信点に＋1。",
      "「あなたの噂は聞いていますわ、ご活躍だそうね」相手はどうもおまえを知っていて、しかも好意的らしい。ありがたく話を聞く。威信点に＋1。",
      "事件とは無関係にインサイダー情報を嗅ぎつける。手を出すなら【幸運】で難易度14。成功すれば1D×$1000（クリティカルなら$10000）を得て、失敗すれば同額（ファンブルなら$10,000）を失う。",
      "事件とは無関係にインサイダー情報を嗅ぎつける。手を出すなら【幸運】で難易度14。成功すれば1D×$1000（クリティカルなら$10000）を得て、失敗すれば同額（ファンブルなら$10,000）を失う。",
      "事件とは無関係にインサイダー情報を嗅ぎつける。手を出すなら【幸運】で難易度14。成功すれば1D×$1000（クリティカルなら$10000）を得て、失敗すれば同額（ファンブルなら$10,000）を失う。",
      "上流階級独特のイヤミと皮肉に満ちた会話でおまえの精神は疲弊する。現在の【MP】を半分（端数切り捨て）にせよ。こんなところ、人間の住むところじゃない。",
      "上流階級独特のイヤミと皮肉に満ちた会話でおまえの精神は疲弊する。現在の【MP】を半分（端数切り捨て）にせよ。こんなところ、人間の住むところじゃない。",
      "上流階級独特のイヤミと皮肉に満ちた会話でおまえの精神は疲弊する。現在の【MP】を半分（端数切り捨て）にせよ。こんなところ、人間の住むところじゃない。",
      "おまえが上流社会で一番重要なのが知り合いの数だと思い知らされる。おまえが常備化しているコネクションに「種別：上流」のキャラクターがいれば、次の情報収集に＋2。",
      "おまえが上流社会で一番重要なのが知り合いの数だと思い知らされる。おまえが常備化しているコネクションに「種別：上流」のキャラクターがいれば、次の情報収集に＋2。",
      "おまえが上流社会で一番重要なのが知り合いの数だと思い知らされる。おまえが常備化しているコネクションに「種別：上流」のキャラクターがいれば、次の情報収集に＋2。",
      "慈善活動の募金に巻き込まれる。こういうのが大事なんだ、ヤツらの社会じゃな。おまえが［現在の威信点×$500］を支払うなら、次の情報収集に＋2。",
      "慈善活動の募金に巻き込まれる。こういうのが大事なんだ、ヤツらの社会じゃな。おまえが［現在の威信点×$500］を支払うなら、次の情報収集に＋2。",
      "慈善活動の募金に巻き込まれる。こういうのが大事なんだ、ヤツらの社会じゃな。おまえが［現在の威信点×$500］を支払うなら、次の情報収集に＋2。",
      "知らないうちに流行が変わっていた。最新モードの服を急いで仕立てるなら、1D×$1,000。仕立てないなら、【幸運】難易度12の判定を行ない、失敗すればおまえの威信点を－1Dすること。",
      "知らないうちに流行が変わっていた。最新モードの服を急いで仕立てるなら、1D×$1,000。仕立てないなら、【幸運】難易度12の判定を行ない、失敗すればおまえの威信点を－1Dすること。",
      "知らないうちに流行が変わっていた。最新モードの服を急いで仕立てるなら、1D×$1,000。仕立てないなら、【幸運】難易度12の判定を行ない、失敗すればおまえの威信点を－1Dすること。",
      "最新の社会問題についてのウィットに富んだ会話を求められる。【理知】難易度12の判定を行なえ。成功すれば、次の情報収集に＋2。失敗すれば威信点を1を失う。",
      "最新の社会問題についてのウィットに富んだ会話を求められる。【理知】難易度12の判定を行なえ。成功すれば、次の情報収集に＋2。失敗すれば威信点を1を失う。",
      "最新の社会問題についてのウィットに富んだ会話を求められる。【理知】難易度12の判定を行なえ。成功すれば、次の情報収集に＋2。失敗すれば威信点を1を失う。",
      "テロリストの襲撃だ！　「種別：人間」のエネミー1D体がおまえを襲撃する。登場難易度14のシーンで戦闘を行なうこと。距離は4マス。",
      "テロリストの襲撃だ！　「種別：人間」のエネミー1D体がおまえを襲撃する。登場難易度14のシーンで戦闘を行なうこと。距離は4マス。",
      "テロリストの襲撃だ！　「種別：人間」のエネミー1D体がおまえを襲撃する。登場難易度14のシーンで戦闘を行なうこと。距離は4マス。",
    ]
    return get_table_by_d66(table)
  end

 # ドロップチャート：コーポレイト(2d6)[DCP]
  def tgs_drop_corporate_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "9㎜ピストル",
      "9㎜ピストル",
      "装飾品（$200）",
      "装飾品（$200）",
      "スティムパック",
      "スティムパック",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：バンデッド(2d6)[DBD]
  def tgs_drop_bandit_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      ".45口径SMG",
      ".45口径SMG",
      "戦前の缶詰（$60）×4",
      "戦前の缶詰（$60）×4",
      "アッパードラッグ",
      "アッパードラッグ",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：クリミナル(2d6)[DCR]
  def tgs_drop_criminal_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "現金$1D×50",
      "現金$1D×50",
      "アルコール",
      "アルコール",
      "派手なスーツ（$700）",
      "派手なスーツ（$700）",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：ニンジャ(2d6)[DNJ]
  def tgs_drop_ninja_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "シュリケン",
      "シュリケン",
      "スティムパック",
      "スティムパック",
      "スティムパック",
      "カタナ",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：ロボ (2d6)[DRB]
  def tgs_drop_robot_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "Eセル×2セット",
      "Eセル×2セット",
      "廃棄部品（$30）×5",
      "廃棄部品（$30）×5",
      "ヴォルトコーラ",
      "ヴォルトコーラ",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：武装車輛(2d6)[DBS]
  def tgs_drop_busousyaryou_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "現金$1D×30",
      "現金$1D×30",
      "スティムパック",
      "スティムパック",
      "5.56㎜アサルトライフル",
      "5.56㎜アサルトライフル",
    ]
    
    return get_table_by_2d6(table)
  end
  
 # ドロップチャート：ターレット(2d6)[DTR]
  def tgs_drop_turret_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "7.62㎜弾×3",
      "7.62㎜弾×3",
      "廃棄部品（$30）×2",
      "廃棄部品（$30）×2",
      "廃棄部品（$30）×2",
      "7.62㎜マシンガン",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：メルカバ (2d6)[DMK]
  def tgs_drop_merkava_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "廃棄部品（$30）×10",
      "廃棄部品（$30）×10",
      "スティムパック",
      "スティムパック",
      "アッパードラッグ",
      "アッパードラッグ",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：ヘリ(2d6)[DHL]
  def tgs_drop_heli_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "レアメタル（$100）×1D",
      "レアメタル（$100）×1D",
      "スーパースティムパック",
      "スーパースティムパック",
      "アッパードラッグ×2",
      "アッパードラッグ×2",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：マシンライフ(2d6)[DML]
  def tgs_drop_machinelife_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "レアメタル（$100）×1D",
      "レアメタル（$100）×1D",
      "未知の金属（$1,000）",
      "未知の金属（$1,000）",
      "未知の金属（$1,000）",
      "マシンライフコア（$10,000）",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：ゾンビ (2d6)[DZB]
  def tgs_drop_zombie_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "ぬいぐるみ（$10）",
      "スティムパック",
      "スティムパック",
      "装飾品（$500）",
      "装飾品（$500）",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：ミュータント(2d6)[DMT]
  def tgs_drop_mutant_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "アルコール",
      "アルコール",
      "スティムパック",
      "スティムパック",
      "戦前の酒（$1,500）",
      "戦前の酒（$1,500）",
    ]
    
    return get_table_by_2d6(table)
  end
  
 # ドロップチャート：BM／飛竜科(2d6)[DHR]
  def tgs_drop_hiryu_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "飛竜の鱗（$500）",
      "飛竜の鱗（$500）",
      "飛竜の羽根（$2,000）",
      "飛竜の羽根（$2,000）",
      "飛竜の羽根（$2,000）",
      "飛竜の角（$10,000）",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：BM／巨爪科 (2d6)[DKS]
  def tgs_drop_kyosou_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "現金$200×1D",
      "現金$200×1D",
      "分厚い毛皮（$3,500）",
      "分厚い毛皮（$3,500）",
      "巨大な爪（$7,000）",
      "巨大な爪（$7,000）",
    ]
    
    return get_table_by_2d6(table)
  end

 # ドロップチャート：フィーンド(2d6)[DFD]
  def tgs_drop_fiend_table
    table = [
      "特になし",
      "特になし",
      "特になし",
      "特になし",
      "アッパードラッグ×2",
      "アッパードラッグ×2",
      "アッパードラッグ×2",
      "アッパードラッグD",
      "アッパードラッグD",
      "異次元の結晶（$12,000）",
      "異次元の結晶（$12,000）",
    ]
    
    return get_table_by_2d6(table)
  end

end
