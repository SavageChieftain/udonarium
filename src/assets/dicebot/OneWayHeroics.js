/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy, $gvars = Opal.gvars, $hash2 = Opal.hash2;

  Opal.add_stubs(['$debug', '$analyzeDiceCommandResultMethod', '$nil?', '$getCommandTablesResult', '$[]', '$upcase', '$===', '$to_i', '$roll', '$getTableResult', '$==', '$getD66', '$empty?', '$<', '$rollJudgeDice', '$+', '$getJudgeReusltText', '$getDiceListFromDiceText', '$sort!', '$reverse!', '$>=', '$assoc', '$each', '$>', '$first', '$respond_to?', '$arity', '$call', '$rollDiceCommand', '$lambda', '$getAddRoll', '$<=', '$getRandomEventAddText', '$getRandomEventAddTextProc', '$getAddRollProc', '$*', '$getGoldTextProc', '$getDownTextProc', '$setPrefixes', '$keys']);
  return (function($base, $super, $parent_nesting) {
    function $OneWayHeroics(){};
    var self = $OneWayHeroics = $klass($base, $super, 'OneWayHeroics', $OneWayHeroics);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_OneWayHeroics_initialize_1, TMP_OneWayHeroics_gameName_2, TMP_OneWayHeroics_gameType_3, TMP_OneWayHeroics_getHelpMessage_4, TMP_OneWayHeroics_rollDiceCommand_5, TMP_OneWayHeroics_getCommandTablesResult_6, TMP_OneWayHeroics_getRollDiceCommandResult_7, TMP_OneWayHeroics_rollJudgeDice_8, TMP_OneWayHeroics_getJudgeReusltText_9, TMP_OneWayHeroics_getTableResult_11, TMP_OneWayHeroics_getAddRoll_12, TMP_OneWayHeroics_getAddRollProc_14, TMP_OneWayHeroics_getRandomEventAddText_15, TMP_OneWayHeroics_getRandomEventAddTextProc_17, TMP_OneWayHeroics_getRandomEventDiceCommandResult_18, TMP_OneWayHeroics_getRandomEventPlusDiceCommandResult_19, TMP_OneWayHeroics_getDungeonTableDiceCommandResult_20, TMP_OneWayHeroics_getDungeonPlusTableDiceCommandResult_21, TMP_OneWayHeroics_getGoldTextProc_23, TMP_OneWayHeroics_getDownTextProc_25, TMP_OneWayHeroics_getAddRollProc_27;

    def.d66Type = nil;
    
    
    Opal.defn(self, '$initialize', TMP_OneWayHeroics_initialize_1 = function $$initialize() {
      var self = this, $iter = TMP_OneWayHeroics_initialize_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) TMP_OneWayHeroics_initialize_1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      
      $send(self, Opal.find_super_dispatcher(self, 'initialize', TMP_OneWayHeroics_initialize_1, false), $zuper, $iter);
      return (self.d66Type = 2);
    }, TMP_OneWayHeroics_initialize_1.$$arity = 0);
    
    Opal.defn(self, '$gameName', TMP_OneWayHeroics_gameName_2 = function $$gameName() {
      var self = this;

      return "片道勇者"
    }, TMP_OneWayHeroics_gameName_2.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_OneWayHeroics_gameType_3 = function $$gameType() {
      var self = this;

      return "OneWayHeroics"
    }, TMP_OneWayHeroics_gameType_3.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_OneWayHeroics_getHelpMessage_4 = function $$getHelpMessage() {
      var self = this;

      return "" + "・判定　aJDx+y,z\n" + "　a:ダイス数（省略時2個)、x:能力値、\n" + "　y:修正値（省略可。「＋」のみなら＋１）、z:目標値（省略可）\n" + "　例１）JD2+1,8 or JD2+,8　：能力値２、修正＋１、目標値８\n" + "　例２）JD3,10 能力値３、修正なし、目標値10\n" + "　例３）3JD4+ ダイス3個から2個選択、能力値４、修正なし、目標値なし\n" + "・ファンブル表 FT／魔王追撃表   DC／進行ルート表 PR／会話テーマ表 TT\n" + "逃走判定表   EC／ランダムNPC特徴表 RNPC／偵察表 SCT\n" + "施設表　FCLT／施設表プラス　FCLTP／希少動物表 RANI／王特徴表プラス KNGFTP\n" + "野外遭遇表 OUTENC／野外遭遇表プラス OUTENCP\n" + "モンスター特徴表 MONFT／モンスター特徴表プラス MONFTP\n" + "ドロップアイテム表 DROP／ドロップアイテム表プラス DROPP\n" + "武器ドロップ表 DROPWP／武器ドロップ表2 DROPWP2\n" + "防具ドロップ表 DROPAR／防具ドロップ表2 DROPAR2\n" + "聖武具ドロップ表 DROPHW／聖武具ドロップ表プラス DROPHWP\n" + "食品ドロップ表 DROPFD／食品ドロップ表2 DROPFD2\n" + "巻物ドロップ表 DROPSC／巻物ドロップ表2 DROPSC2\n" + "その他ドロップ表 DROPOT／その他 ドロップ表2 DROPOT2\n" + "薬品ドロップ表プラス DROPDRP／珍しい箱ドロップ表2 DROPRAREBOX2\n" + "・ランダムイベント表 RETx（x：現在の日数）、ランダムイベント表プラス RETPx\n" + "　例）RET3、RETP4\n" + "・ダンジョン表 DNGNx（x：現在の日数）、ダンジョン表プラス DNGNPx\n" + "　例）DNGN3、DNGNP4\n"
    }, TMP_OneWayHeroics_getHelpMessage_4.$$arity = 0);
    
    Opal.defn(self, '$rollDiceCommand', TMP_OneWayHeroics_rollDiceCommand_5 = function $$rollDiceCommand(command) {
      var self = this, result = nil;

      
      self.$debug("rollDiceCommand command", command);
      result = self.$analyzeDiceCommandResultMethod(command);
      if ($truthy(result['$nil?']())) {
        } else {
        return result
      };
      return self.$getCommandTablesResult(command);
    }, TMP_OneWayHeroics_rollDiceCommand_5.$$arity = 1);
    
    Opal.defn(self, '$getCommandTablesResult', TMP_OneWayHeroics_getCommandTablesResult_6 = function $$getCommandTablesResult(command) {
      var $a, $b, $c, $d, self = this, info = nil, name = nil, type = nil, table = nil, hasGap = nil, $case = nil, count = nil, dice = nil, isSwap = nil, number = nil, text = nil;

      
      info = Opal.const_get_relative($nesting, 'TABLES')['$[]'](command.$upcase());
      if ($truthy(info['$nil?']())) {
        return nil};
      name = info['$[]']("name");
      type = info['$[]']("type");
      table = info['$[]']("table");
      hasGap = info['$[]']("hasGap");
      $b = (function() {$case = type;
      if (/^(\d+)D6$/i['$===']($case)) {
      count = (($c = $gvars['~']) === nil ? nil : $c['$[]'](1)).$to_i();
      $d = self.$roll(count, 6), $c = Opal.to_ary($d), (dice = ($c[0] == null ? nil : $c[0])), $d;
      return self.$getTableResult(table, dice, hasGap);}
      else if ("D66"['$===']($case)) {
      isSwap = self.d66Type['$=='](2);
      dice = self.$getD66(isSwap);
      return self.$getTableResult(table, dice, hasGap);}
      else {return nil}})(), $a = Opal.to_ary($b), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(text['$nil?']())) {
        return nil};
      return "" + (name) + "(" + (number) + ") ＞ " + (text);
    }, TMP_OneWayHeroics_getCommandTablesResult_6.$$arity = 1);
    
    Opal.defn(self, '$getRollDiceCommandResult', TMP_OneWayHeroics_getRollDiceCommandResult_7 = function $$getRollDiceCommandResult(command) {
      var $a, $b, self = this, diceCount = nil, ability = nil, target = nil, modifyText = nil, modifyValue = nil, dice = nil, diceText = nil, total = nil, text = nil, result = nil;

      
      if ($truthy(/^(\d*)JD(\d*)(\+(\d*))?(,(\d+))?$/['$==='](command))) {
        } else {
        return nil
      };
      diceCount = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1));
      if ($truthy(diceCount['$empty?']())) {
        diceCount = 2};
      diceCount = diceCount.$to_i();
      if ($truthy($rb_lt(diceCount, 2))) {
        return nil};
      ability = (($a = $gvars['~']) === nil ? nil : $a['$[]'](2)).$to_i();
      target = (($a = $gvars['~']) === nil ? nil : $a['$[]'](6));
      if ($truthy(target['$nil?']())) {
        } else {
        target = target.$to_i()
      };
      modifyText = ($truthy($a = (($b = $gvars['~']) === nil ? nil : $b['$[]'](3))) ? $a : "");
      if (modifyText['$==']("+")) {
        modifyText = "+1"};
      modifyValue = modifyText.$to_i();
      $b = self.$rollJudgeDice(diceCount), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
      total = $rb_plus($rb_plus(dice, ability), modifyValue);
      text = "" + (command);
      text = $rb_plus(text, "" + " ＞ " + (diceCount) + "D6[" + (diceText) + "]+" + (ability) + (modifyText));
      text = $rb_plus(text, "" + " ＞ " + (total));
      result = self.$getJudgeReusltText(dice, total, target);
      if ($truthy(result['$empty?']())) {
        } else {
        text = $rb_plus(text, "" + " ＞ " + (result))
      };
      return text;
    }, TMP_OneWayHeroics_getRollDiceCommandResult_7.$$arity = 1);
    
    Opal.defn(self, '$rollJudgeDice', TMP_OneWayHeroics_rollJudgeDice_8 = function $$rollJudgeDice(diceCount) {
      var $a, $b, self = this, dice = nil, diceText = nil, diceList = nil, total = nil, text = nil;

      
      $b = self.$roll(diceCount, 6), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(diceCount['$=='](2))) {
        return [dice, diceText]};
      diceList = self.$getDiceListFromDiceText(diceText);
      diceList['$sort!']();
      diceList['$reverse!']();
      total = $rb_plus(diceList['$[]'](0), diceList['$[]'](1));
      text = "" + (diceText) + "→" + (diceList['$[]'](0)) + "," + (diceList['$[]'](1));
      return [total, text];
    }, TMP_OneWayHeroics_rollJudgeDice_8.$$arity = 1);
    
    Opal.defn(self, '$getJudgeReusltText', TMP_OneWayHeroics_getJudgeReusltText_9 = function $$getJudgeReusltText(dice, total, target) {
      var self = this;

      
      if (dice['$=='](2)) {
        return "ファンブル"};
      if (dice['$=='](12)) {
        return "スペシャル"};
      if ($truthy(target['$nil?']())) {
        return ""};
      if ($truthy($rb_ge(total, target))) {
        return "成功"};
      return "失敗";
    }, TMP_OneWayHeroics_getJudgeReusltText_9.$$arity = 3);
    
    Opal.defn(self, '$getTableResult', TMP_OneWayHeroics_getTableResult_11 = function $$getTableResult(table, dice, hasGap) {
      var $a, $b, TMP_10, self = this, number = nil, text = nil, command = nil, params = nil, $case = nil;

      if (hasGap == null) {
        hasGap = false;
      }
      
      $b = table.$assoc(dice), $a = Opal.to_ary($b), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), (command = ($a[2] == null ? nil : $a[2])), $b;
      if ($truthy(($truthy($a = number['$nil?']()) ? hasGap : $a))) {
        
        params = nil;
        (function(){var $brk = Opal.new_brk(); try {return $send(table, 'each', [], (TMP_10 = function(data){var self = TMP_10.$$s || this;
if (data == null) data = nil;
        
          if ($truthy($rb_gt(data.$first(), dice))) {
            
            Opal.brk(nil, $brk)};
          return (params = data);}, TMP_10.$$s = self, TMP_10.$$brk = $brk, TMP_10.$$arity = 1, TMP_10))
        } catch (err) { if (err === $brk) { return err.$v } else { throw err } }})();
        $a = [].concat(Opal.to_a(params)), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), (command = ($a[2] == null ? nil : $a[2])), $a;};
      if ($truthy(command['$respond_to?']("call"))) {
        $case = command.$arity();
        if ((0)['$===']($case)) {text = $rb_plus(text, command.$call())}
        else if ((1)['$===']($case)) {text = $rb_plus(text, command.$call(self))}};
      return [number, text];
    }, TMP_OneWayHeroics_getTableResult_11.$$arity = -3);
    
    Opal.defn(self, '$getAddRoll', TMP_OneWayHeroics_getAddRoll_12 = function $$getAddRoll(command) {
      var self = this, text = nil;

      
      if ($truthy(/^\s/['$==='](command))) {
        return command};
      text = self.$rollDiceCommand(command);
      if ($truthy(text['$nil?']())) {
        return "" + " ＞ " + (command) + " is NOT found."};
      return "" + " ＞ \n " + (command) + " ＞ " + (text);
    }, TMP_OneWayHeroics_getAddRoll_12.$$arity = 1);
    
    Opal.defn(self, '$getAddRollProc', TMP_OneWayHeroics_getAddRollProc_14 = function $$getAddRollProc(command) {
      var TMP_13, self = this;

      return $send(self, 'lambda', [], (TMP_13 = function(){var self = TMP_13.$$s || this;

      return self.$getAddRoll(command)}, TMP_13.$$s = self, TMP_13.$$arity = 0, TMP_13))
    }, TMP_OneWayHeroics_getAddRollProc_14.$$arity = 1);
    
    Opal.defn(self, '$getRandomEventAddText', TMP_OneWayHeroics_getRandomEventAddText_15 = function $$getRandomEventAddText(day, command1, command2) {
      var $a, $b, self = this, dice = nil, text = nil;

      
      $b = self.$roll(1, 6), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), $b;
      text = "" + " ＞ \n 1D6[" + (dice) + "]";
      if ($truthy($rb_le(dice, day))) {
        
        text = $rb_plus(text, "" + " ＞ 日数[" + (day) + "]以下");
        text = $rb_plus(text, self.$getAddRoll(command1));
        } else {
        
        text = $rb_plus(text, "" + " ＞ 日数[" + (day) + "]を超えている");
        text = $rb_plus(text, self.$getAddRoll(command2));
      };
      return text;
    }, TMP_OneWayHeroics_getRandomEventAddText_15.$$arity = 3);
    
    Opal.defn(self, '$getRandomEventAddTextProc', TMP_OneWayHeroics_getRandomEventAddTextProc_17 = function $$getRandomEventAddTextProc(day, command1, command2) {
      var TMP_16, self = this;

      return $send(self, 'lambda', [], (TMP_16 = function(){var self = TMP_16.$$s || this;

      return self.$getRandomEventAddText(day, command1, command2)}, TMP_16.$$s = self, TMP_16.$$arity = 0, TMP_16))
    }, TMP_OneWayHeroics_getRandomEventAddTextProc_17.$$arity = 3);
    
    Opal.defn(self, '$getRandomEventDiceCommandResult', TMP_OneWayHeroics_getRandomEventDiceCommandResult_18 = function $$getRandomEventDiceCommandResult(command) {
      var $a, $b, self = this, day = nil, name = nil, table = nil, dice = nil, number = nil, text = nil;

      
      if ($truthy(/^RET(\d+)$/['$==='](command))) {
        } else {
        return nil
      };
      day = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1)).$to_i();
      name = "ランダムイベント表";
      table = [[1, "" + "さらに１Ｄ６を振る。現在ＰＣがいるエリアの【日数】以下なら「施設表(FCLT)」へ移動。【日数】を超えていれば「ダンジョン表(DNGN" + (day) + ")」（１５３ページ）へ移動。", self.$getRandomEventAddTextProc(day, "FCLT", "" + "DNGN" + (day))], [2, "さらに１Ｄ６を振る。現在ＰＣがいるエリアの【日数】以下なら「世界の旅表」（１５７ページ）へ移動。【日数】を超えていれば「野外遭遇表(OUTENC)」（１５５ページ）へ移動。", self.$getRandomEventAddTextProc(day, " ＞ 「世界の旅表」（１５７ページ）へ。", "OUTENC")], [3, "「施設表」へ移動。", self.$getAddRollProc("FCLT")], [4, "「世界の旅表」（１５７ページ）へ移動。"], [5, "「野外遭遇表」（１５５ページ）へ移動。", self.$getAddRollProc("OUTENC")], [6, "「ダンジョン表」（１５２ページ）へ移動。", self.$getAddRollProc("" + "DNGN" + (day))]];
      $b = self.$roll(1, 6), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), $b;
      $b = self.$getTableResult(table, dice), $a = Opal.to_ary($b), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(text['$nil?']())) {
        return nil};
      return "" + (name) + "(" + (number) + ") ＞ " + (text);
    }, TMP_OneWayHeroics_getRandomEventDiceCommandResult_18.$$arity = 1);
    
    Opal.defn(self, '$getRandomEventPlusDiceCommandResult', TMP_OneWayHeroics_getRandomEventPlusDiceCommandResult_19 = function $$getRandomEventPlusDiceCommandResult(command) {
      var $a, $b, self = this, day = nil, name = nil, table = nil, dice = nil, number = nil, text = nil;

      
      if ($truthy(/^RETP(\d+)$/['$==='](command))) {
        } else {
        return nil
      };
      day = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1)).$to_i();
      name = "ランダムイベント表プラス";
      table = [[1, "さらに1D6を振る。現在PCがいるエリアの【日数】以下なら施設表プラス（０２２ページ）へ移動。【経過日数】を超えていればダンジョン表プラス（０２５ページ）へ移動", self.$getRandomEventAddTextProc(day, "FCLTP", "" + "DNGNP" + (day))], [2, "さらに1D6を振る。現在PCがいるエリアの【日数】以下なら世界の旅表（基本１５７ページ）へ移動。【経過日数】を超えていれば野外遭遇表（基本１５５ページ）へ移動", self.$getRandomEventAddTextProc(day, " ＞ 「世界の旅表」（１５７ページ）へ。", "OUTENC")], [3, "さらに1D6を振る。現在PCがいるエリアの【日数】以下なら世界の旅表２（０２８ページ）へ移動。【経過日数】を超えていれば野外遭遇表プラス（０２５ページ）へ移動", self.$getRandomEventAddTextProc(day, " ＞ 世界の旅表２（０２８ページ）へ。", "OUTENCP")], [4, "さらに1D6を振る。奇数なら世界の旅表（基本１５７ページ）へ移動。偶数なら世界の旅表２（０２８ページ）へ移動", self.$getRandomEventAddTextProc(day, " ＞ 世界の旅表（基本１５７ページ）へ。", "偶数なら世界の旅表２（０２８ページ）へ。")], [5, "施設表プラスへ移動（０２２ページ）", self.$getAddRollProc("FCLTP")], [6, "ダンジョン表プラスへ移動（０２５ページ）", self.$getAddRollProc("" + "DNGNP" + (day))]];
      $b = self.$roll(1, 6), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), $b;
      $b = self.$getTableResult(table, dice), $a = Opal.to_ary($b), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(text['$nil?']())) {
        return nil};
      return "" + (name) + "(" + (number) + ") ＞ " + (text);
    }, TMP_OneWayHeroics_getRandomEventPlusDiceCommandResult_19.$$arity = 1);
    
    Opal.defn(self, '$getDungeonTableDiceCommandResult', TMP_OneWayHeroics_getDungeonTableDiceCommandResult_20 = function $$getDungeonTableDiceCommandResult(command) {
      var $a, $b, self = this, day = nil, name = nil, table = nil, dice = nil, hasGap = nil, number = nil, text = nil;

      
      if ($truthy(/^DNGN(\d+)$/['$==='](command))) {
        } else {
        return nil
      };
      day = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1)).$to_i();
      name = "ダンジョン表";
      table = [[1, "犬小屋（１５５ページ）。"], [2, "犬小屋（１５５ページ）。"], [3, "「ダンジョン遭遇表」（１５３ページ）へ移動。小型ダンジョンだ。"], [4, "「ダンジョン遭遇表」（１５３ページ）へ移動。小型ダンジョンだ。"], [5, "「ダンジョン遭遇表」（１５３ページ）へ移動。ここは中型ダンジョンなので、モンスターが出現した場合、数が1体増加する。さらにイベントの経験値が1増加する。"], [6, "「ダンジョン遭遇表」（１５３ページ）へ移動。ここは大型ダンジョンなので、モンスターが出現した場合、数が2体増加する。さらにイベントの経験値が2増加する。"], [7, "牢獄遭遇表へ移動（１５４ページ）。牢獄つきダンジョン。"]];
      $b = self.$roll(1, 6), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), $b;
      if ($truthy($rb_ge(day, 4))) {
        dice = $rb_plus(dice, 1)};
      hasGap = true;
      $b = self.$getTableResult(table, dice, hasGap), $a = Opal.to_ary($b), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(text['$nil?']())) {
        return nil};
      return "" + (name) + "(" + (number) + ") ＞ " + (text);
    }, TMP_OneWayHeroics_getDungeonTableDiceCommandResult_20.$$arity = 1);
    
    Opal.defn(self, '$getDungeonPlusTableDiceCommandResult', TMP_OneWayHeroics_getDungeonPlusTableDiceCommandResult_21 = function $$getDungeonPlusTableDiceCommandResult(command) {
      var $a, $b, self = this, day = nil, name = nil, table = nil, dice = nil, hasGap = nil, number = nil, text = nil;

      
      if ($truthy(/^DNGNP(\d+)$/['$==='](command))) {
        } else {
        return nil
      };
      day = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1)).$to_i();
      name = "ダンジョン表プラス";
      table = [[2, "犬小屋（基本１５５ページ）"], [3, "犬小屋（基本１５５ページ）"], [4, "犬小屋（基本１５５ページ）"], [5, "犬小屋（基本１５５ページ）"], [6, "「ダンジョン遭遇表」（基本１５３ページ）へ移動。小型ダンジョンだ。"], [7, "「ダンジョン遭遇表」（基本１５３ページ）へ移動。小型ダンジョンだ。"], [8, "「ダンジョン遭遇表」（基本１５３ページ）へ移動。ここは中型ダンジョンのため、モンスターが出現した場合、数が１体増加する。またイベントの【経験値】が１増加する。"], [9, "「ダンジョン遭遇表」（基本１５３ページ）へ移動。ここは大型ダンジョンのため、モンスターが出現した場合、数が２体増加する。またイベントの【経験値】が２増加する。"], [10, "「ダンジョン遭遇表」（基本１５３ページ）へ移動。近くに寄っただけで吸い込まれる罠のダンジョンだ。「ダンジョン遭遇表」を使用したあと、中央にあるモニュメントに触れて転移して出るか、【鉄格子】と戦闘して出るか選択する。転移した場合は闇の目の前に出てしまい、全力ダッシュで【ＳＴ】を１Ｄ６消費する。【鉄格子】との戦闘では逃走を選択できない。"], [11, "「ダンジョン遭遇表」（基本１５３ページ）へ移動。水浸しのダンジョンで、「ダンジョン遭遇表」を使用した直後に【ＳＴ】が３減少する。「水泳」"], [12, "水路に囲まれた水上遺跡だ。なかに入るなら【ＳＴ】を４消費（「水泳」）してから「ダンジョン遭遇表」（基本１５３ページ）へ移動。イベントの判定に成功すると追加で【豪華な宝箱】が１つ出現し、戦闘か開錠を試みられる。"], [13, "「牢獄遭遇表」（基本１５４ページ）へ移動。牢獄つきダンジョンだ。"], [14, "砂の遺跡にたどりつき、「牢獄遭遇表」（基本１５４ページ）へ移動。モンスターが出現した場合、数が２体増加する。またイベントの【経験値】が２増加する。イベントの判定に成功すると追加で【珍しい箱】が１つ出現し、戦闘か開錠を試みられる。"]];
      $b = self.$roll(2, 6), $a = Opal.to_ary($b), (dice = ($a[0] == null ? nil : $a[0])), $b;
      if ($truthy($rb_ge(day, 4))) {
        dice = $rb_plus(dice, 2)};
      hasGap = true;
      $b = self.$getTableResult(table, dice, hasGap), $a = Opal.to_ary($b), (number = ($a[0] == null ? nil : $a[0])), (text = ($a[1] == null ? nil : $a[1])), $b;
      if ($truthy(text['$nil?']())) {
        return nil};
      return "" + (name) + "(" + (number) + ") ＞ " + (text);
    }, TMP_OneWayHeroics_getDungeonPlusTableDiceCommandResult_21.$$arity = 1);
    Opal.defs(self, '$getGoldTextProc', TMP_OneWayHeroics_getGoldTextProc_23 = function $$getGoldTextProc(diceCount, times, doSomething) {
      var TMP_22, self = this;

      return $send(self, 'lambda', [], (TMP_22 = function(diceBot){var self = TMP_22.$$s || this, $a, $b, total = nil, diceText = nil, gold = nil;
if (diceBot == null) diceBot = nil;
      
        $b = diceBot.$roll(diceCount, 6), $a = Opal.to_ary($b), (total = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
        gold = $rb_times(total, times);
        return "" + " ＞ " + (diceCount) + "D6[" + (diceText) + "]×" + (times) + " ＞ 【所持金】 " + (gold) + " を" + (doSomething);}, TMP_22.$$s = self, TMP_22.$$arity = 1, TMP_22))
    }, TMP_OneWayHeroics_getGoldTextProc_23.$$arity = 3);
    Opal.defs(self, '$getDownTextProc', TMP_OneWayHeroics_getDownTextProc_25 = function $$getDownTextProc(name, diceCount) {
      var TMP_24, self = this;

      return $send(self, 'lambda', [], (TMP_24 = function(diceBot){var self = TMP_24.$$s || this, $a, $b, total = nil, diceText = nil;
if (diceBot == null) diceBot = nil;
      
        $b = diceBot.$roll(diceCount, 6), $a = Opal.to_ary($b), (total = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
        return "" + " ＞ " + (diceCount) + "D6[" + (diceText) + "] ＞ " + (name) + "が " + (total) + " 減少する";}, TMP_24.$$s = self, TMP_24.$$arity = 1, TMP_24))
    }, TMP_OneWayHeroics_getDownTextProc_25.$$arity = 2);
    Opal.defs(self, '$getAddRollProc', TMP_OneWayHeroics_getAddRollProc_27 = function $$getAddRollProc(command) {
      var TMP_26, self = this;

      return $send(self, 'lambda', [], (TMP_26 = function(diceBot){var self = TMP_26.$$s || this;
if (diceBot == null) diceBot = nil;
      return diceBot.$getAddRoll(command)}, TMP_26.$$s = self, TMP_26.$$arity = 1, TMP_26))
    }, TMP_OneWayHeroics_getAddRollProc_27.$$arity = 1);
    Opal.const_set($nesting[0], 'TABLES', $hash2(["FT", "DC", "PR", "TT", "EC", "RNPC", "SCT", "FCLT", "FCLTP", "OUTENC", "OUTENCP", "MONFT", "MONFTP", "RANI", "DROP", "DROPWP", "DROPAR", "DROPHW", "DROPFD", "DROPSC", "DROPOT", "DROPP", "DROPDRP", "DROPSC2", "DROPWP2", "DROPAR2", "DROPHWP", "DROPFD2", "DROPOT2", "DROPRAREBOX2", "KNGFTP"], {"FT": $hash2(["name", "type", "table"], {"name": "ファンブル表", "type": "1D6", "table": [[1, "装備以外のアイテムのうちプレイヤー指定の１つを失う"], [2, "装備のうちプレイヤー指定の１つを失う"], [3, "１Ｄ６に１００を掛け、それだけの【所持金】を失う", self.$getGoldTextProc(1, 100, "失う")], [4, "１Ｄ６に１００を掛け、それだけの【所持金】を拾う", self.$getGoldTextProc(1, 100, "拾う")], [5, "【経験値】２を獲得する"], [6, "【経験値】４を獲得する"]]}), "DC": $hash2(["name", "type", "table"], {"name": "魔王追撃表", "type": "1D6", "table": [[1, "装備以外のアイテムのうちＧＭ指定の１つを失う"], [2, "装備のうちＧＭ指定の１つを失う"], [3, "２Ｄ６に１００を掛け、それだけの【所持金】を失う", self.$getGoldTextProc(2, 100, "失う")], [4, "【ＬＩＦＥ】が１Ｄ６減少する", self.$getDownTextProc("【ＬＩＦＥ】", 1)], [5, "【ＳＴ】が１Ｄ６減少する", self.$getDownTextProc("【ＳＴ】", 1)], [6, "【ＬＩＦＥ】が２Ｄ６減少する", self.$getDownTextProc("【ＬＩＦＥ】", 2)]]}), "PR": $hash2(["name", "type", "table"], {"name": "進行ルート表", "type": "1D6", "table": [[1, "少し荒れた地形が続く。【日数】から【筋力】を引いただけ【ＳＴ】が減少する（最低０）。"], [2, "穏やかな地形が続く。【日数】から【敏捷】を引いただけ【ＳＴ】が減少する（最低０）。"], [3, "険しい岩山だ。【日数】に１を足して【生命】を引いただけ【ＳＴ】が減少する（最低０）。「登山」"], [4, "山で迷った。【日数】に２を足して【知力】を引いただけ【ＳＴ】が減少する（最低０）。「登山」"], [5, "川を泳ぐ。【日数】に１を足して【意志】を引いただけ【ＳＴ】が減少する（最低０）。「水泳」"], [6, "広い川を船で渡る。【日数】に２を足して【魅力】を引いただけ【ＳＴ】が減少する（最低０）。「水泳」"]]}), "TT": $hash2(["name", "type", "table"], {"name": "会話テーマ表", "type": "1D6", "table": [[1, "身体の悩みごとについて話す。【筋力】で判定。"], [2, "仕事の悩みごとについて話す。【敏捷】で判定。"], [3, "家族の悩みごとについて話す。【生命】で判定。"], [4, "勇者としてこれでいいのか的悩みごとを話す。【知力】で判定。"], [5, "友人関係の悩みごとを話す。【意志】で判定。"], [6, "恋の悩みごとを話す。【魅力】で判定。"]]}), "EC": $hash2(["name", "type", "table"], {"name": "逃走判定表", "type": "1D6", "table": [[1, "崖を登れば逃げられそうだ。【筋力】を使用する。"], [2, "障害物はない。走るしかない。【敏捷】を使用する。"], [3, "しつこく追われる。【生命】を使用する。"], [4, "隠れられる地形がある。【知力】を使用する。"], [5, "背中を向ける勇気が出るか？　【意志】を使用す"], [6, "もう人徳しか頼れない。【魅力】を使用する。"]]}), "RNPC": $hash2(["name", "type", "table"], {"name": "ランダムNPC特徴表", "type": "2D6", "table": [[2, "【物持ちの】"], [3, "【目のいい】"], [4, "【弱そうな】"], [5, "【宝石好きな】"], [6, "【エッチな】"], [7, "【ケチな】"], [8, "【変態の】"], [9, "【金持ちの】"], [10, "【強そうな】"], [11, "【目の悪い】"], [12, "【すばやい】"]]}), "SCT": $hash2(["name", "type", "table"], {"name": "偵察表", "type": "1D6", "table": [[1, "山に突き当たる。「登山」判定：【筋力】　ジャッジ：山を登る描写。"], [2, "川を流れ下る。「水泳」判定：【敏捷】　ジャッジ：川でピンチに陥る描写。"], [3, "広い湖だ……。「水泳」判定：【生命】　ジャッジ：湖面を泳ぐ描写。"], [4, "山の楽なルートを探そう。「登山」判定：【知力】　ジャッジ：山の豆知識。"], [5, "迫る闇から恐怖のあまり目を離せない。判定：【意志】　ジャッジ：勇者としての決意。"], [6, "任意のＮＰＣに会って情報を聞く。判定：【魅力】　ジャッジ：相手を立てる会話。"]]}), "FCLT": $hash2(["name", "type", "table"], {"name": "施設表", "type": "2D6", "table": [[2, "聖なる神殿（１５２ページ）。"], [3, "魔王の力を封じた神殿（１５２ページ）。"], [4, "耳長たちの村（１５２ページ）。"], [5, "「村遭遇表」へ移動。大きな街なので村遭遇表を２回使用し、好きな結果を選べる。"], [6, "「村遭遇表」へ移動。小さな村だ。"], [7, "エリアの地形が「雪原」なら雪国の小屋（１５２ページ）。エリアの地形が「山岳」なら山小屋（１５２ページ）。それ以外の地形なら「村遭遇表」へ移動。この村は「石の小屋」だ。"], [8, "村遭遇表」へ移動。小さな村だ。"], [9, "村遭遇表」へ移動。大きな街なので村遭遇表を２回使用し、好きな結果を選べる。"], [10, "滅びた石の小屋（１５２ページ）。"], [11, "滅びた小さな村（１５２ページ）。"], [12, "闇ギルド（１５２ページ）。"]]}), "FCLTP": $hash2(["name", "type", "table"], {"name": "施設表プラス", "type": "D66", "table": [[11, "聖なる神殿（基本１５２ページ）"], [12, "魔王の力を封じた神殿（基本１５２ページ）"], [13, "耳長たちの村（基本１５２ページ）判定成功時に【耳長の軽い弓】【耳長の杖】を購入可能"], [14, "村遭遇表へ移動（基本１５１ページ）大きな街なので村遭遇表を2回振り、好きな結果を選べる"], [15, "村遭遇表へ移動（基本１５１ページ）小さな村"], [16, "エリアの地形が雪原なら雪国の小屋（基本１５２ページ）エリアの地形が山岳なら山小屋（基本１５２ページ）それ以外の地形なら石の小屋、村遭遇表へ移動（基本１５１ページ）"], [22, "村遭遇表へ移動（基本１５１ページ）小さな村"], [23, "村遭遇表へ移動（基本１５１ページ）大きな街なので村遭遇表を2回振り、好きな結果を選べる"], [24, "滅びた石の小屋（基本１５２ページ）"], [25, "滅びた小さな村（基本１５２ページ）"], [26, "闇ギルド（基本１５２ページ）判定成功時に一度だけ【闇ギルド袋屋】に３０００シルバ支払い【所持重量】を１増加することができる。"], [33, "小さな店遭遇表プラスへ移動（０２３ページ）"], [34, "酒場遭遇表プラスへ移動"], [35, "酒場遭遇表プラスへ移動"], [36, "錬金おばばの家（０２４ページ）"], [44, "鍛冶屋の家（０２４ページ）"], [45, "半獣人の隠れ家（０２４ページ）"], [46, "罪人の街（０２４ページ）"], [55, "封印の街（０２４ページ）"], [56, "水上の街（０２４ページ）"], [66, "人魚の集落（０２４ページ）"]]}), "OUTENC": $hash2(["name", "type", "table"], {"name": "野外遭遇表", "type": "1D6", "table": [[1, "エリアの地形ごとの野外モンスター表へ移動。モンスターのうち１体にランダムな特徴がつく。モンスター特徴表（１５６ページ）を使用する。", self.$getAddRollProc("MONFT")], [2, "エリアの地形ごとの野外モンスター表へ移動。"], [3, "エリアの地形ごとの野外モンスター表へ移動。"], [4, "アンデッドの群れ（１５６ページ）。"], [5, "盗賊の群れ（１５６ページ）。"], [6, "希少動物表（１５６ページ）へ移動。", self.$getAddRollProc("RANI")]]}), "OUTENCP": $hash2(["name", "type", "table"], {"name": "野外遭遇表プラス", "type": "1D6", "table": [[1, "エリアの地形ごとの野外モンスター表プラスへ移動。モンスターのうち1体にランダムな特徴がつく。モンスター特徴表プラス（０２７ページ）を使用する。", self.$getAddRollProc("MONFTP")], [2, "エリアの地形ごとの野外モンスター表プラスへ移動し、出現したモンスターとの戦闘が発生する"], [3, "スライムモンスター表プラス（０２７ページ）へ移動。"], [4, "アンデッドの群れ（基本１５６ページ）"], [5, "盗賊の群れ（基本１５６ページ）"], [6, "希少動物表（基本１５６ページ）へ移動", self.$getAddRollProc("RANI")]]}), "MONFT": $hash2(["name", "type", "table"], {"name": "モンスター特徴表", "type": "D66", "table": [[11, "【エッチな】"], [12, "【変態の】"], [13, "【弱そうな】"], [14, "【目のいい】"], [15, "【目の悪い】"], [16, "【強そうな】"], [22, "【強そうな】"], [23, "【宝石好きな】"], [24, "【幻の】"], [25, "【違法な】"], [26, "【イカした】"], [33, "【物持ちの】"], [34, "【炎を吐く】"], [35, "【必中の】"], [36, "【すばやい】"], [44, "【やたら硬い】"], [45, "【名の知れた】"], [46, "【凶悪な】"], [55, "【賞金首の】"], [56, "【古代種の】"], [66, "【最強の】"]]}), "MONFTP": $hash2(["name", "type", "table"], {"name": "モンスター特徴表プラス", "type": "D66", "table": [[11, "【エッチな】（基本１７８ページ）"], [12, "【変態の】（基本１７８ページ）"], [13, "【目のいい】（基本１７８ページ）"], [14, "【目の悪い】（基本１７８ページ）"], [15, "【強そうな】（基本１７８ページ）"], [16, "【宝石好きな】（基本１７８ページ）"], [22, "【幻の】（基本１７８ページ）"], [23, "【違法な】（基本１７８ページ）"], [24, "【イカした】（基本１７８ページ）"], [25, "【物持ちの】（基本１７８ページ）"], [26, "【炎を吐く】（基本１７８ページ）"], [33, "【やたら硬い】（基本１７８ページ）"], [34, "【古代種の】（基本１７８ページ）"], [35, "【最強の】（基本１７８ページ）"], [36, "【異国風の】（０４７ページ）"], [44, "【毛深い】（０４７ページ）"], [45, "【耐火の】（０４７ページ）"], [46, "【耐雷の】（０４７ページ） "], [55, "【浮遊の】（０４７ページ）"], [56, "【臭い】（ ０ ４ ７ページ）"], [66, "【恐怖の】（０４７ページ）"]]}), "RANI": $hash2(["name", "type", "hasGap", "table"], {"name": "希少動物表", "type": "1D6", "hasGap": true, "table": [[1, "【『緑の森』隊長】1体と遭遇する。今回のセッションで【雪ウサギ】【山岳ゴート】【遺跡白馬】【草原カワウソ】【砂漠キツネ】のいずれかを倒したことがあれば、戦闘が発生する。戦闘にならなかった場合はなごやかに別れる。"], [2, "【『緑の森』団員】1体と遭遇する。今回のセッションで【雪ウサギ】【山岳ゴート】【遺跡白馬】【草原カワウソ】【砂漠キツネ】のいずれかを倒したことがあれば、戦闘が発生する。戦闘にならなかった場合はなごやかに別れる。"], [4, "地形によって異なる希少動物が1体出現する。雪原なら【雪ウサギ】、山岳なら【山岳ゴート】、遺跡なら【遺跡白馬】、草原なら【草原カワウソ】、砂漠と荒野は【砂漠キツネ】。それ以外は【緑の森団員】となる。戦闘を挑んでもいいし、見送ってもいい。"]]}), "DROP": $hash2(["name", "type", "table"], {"name": "ドロップアイテム表", "type": "1D6", "table": [[1, "武器ドロップ表へ移動", self.$getAddRollProc("DROPWP")], [2, "武器ドロップ表へ移動", self.$getAddRollProc("DROPWP")], [3, "防具ドロップ表へ移動", self.$getAddRollProc("DROPAR")], [4, "食品ドロップ表へ移動", self.$getAddRollProc("DROPFD")], [5, "巻物ドロップ表へ移動", self.$getAddRollProc("DROPSC")], [6, "その他ドロップ表へ移動", self.$getAddRollProc("DROPOT")]]}), "DROPWP": $hash2(["name", "type", "table"], {"name": "武器ドロップ表", "type": "D66", "table": [[11, " 【さびた小剣】"], [12, " 【さびた長剣】"], [13, " 【さびた大剣】"], [14, " 【長い棒】"], [15, " 【ダガー】"], [16, " 【木こりの大斧】"], [22, " 【ショートブレイド】"], [23, " 【木の杖】"], [24, " 【狩人の弓】"], [25, " 【レイピア】"], [26, " 【携帯弓】"], [33, " 【ロングブレイド】"], [34, " 【スレンドスピア】"], [35, " 【バトルアックス】"], [36, " 【軍用剛弓】"], [44, " 【グランドブレイド】"], [45, " 【祈りの杖】"], [46, " 【ヘビィボウガン】"], [55, " 【シルバーランス】"], [56, " 【イーグルブレイド】"], [66, " 【クレセントアクス】"]]}), "DROPAR": $hash2(["name", "type", "table"], {"name": "防具ドロップ表", "type": "D66", "table": [[11, " 【旅人の服】"], [12, " 【旅人の服】"], [13, " 【旅人の服】"], [14, " 【レザーシールド】"], [15, " 【レザーシールド】"], [16, " 【騎士のコート】"], [22, " 【騎士のコート】"], [23, " 【スケイルシールド】"], [24, " 【スケイルシールド】"], [25, " 【レザーベスト】"], [26, " 【レザーベスト】"], [33, " 【ヘビィシールド】"], [34, " 【チェインクロス】"], [35, " 【チェインクロス】"], [36, " 【試練の腕輪】"], [44, " 【精霊のローブ】"], [45, " 【必殺の腕輪】"], [46, " 【ギガントプレート】"], [55, " 【破壊の腕輪】"], [56, " 【理力の腕輪】"], [66, " 【加速の腕輪】"]]}), "DROPHW": $hash2(["name", "type", "table"], {"name": "聖武具ドロップ表", "type": "2D6", "table": [[2, "【紅き太陽の剣】"], [3, "【紅き太陽の剣】"], [4, "【聖剣カレドヴルフ】 "], [5, "【聖斧エルサーベス】 "], [6, "【水霊のマント】"], [7, "【大地の鎧】"], [8, "【大気の盾】"], [9, "【聖弓ル・アルシャ】"], [10, " 【聖槍ヴァルキウス】"], [11, " 【聖なる月の剣】"], [12, " 【聖なる月の剣】"]]}), "DROPFD": $hash2(["name", "type", "table"], {"name": "食品ドロップ表", "type": "D66", "table": [[11, " 【枯れた草】"], [12, " 【こげた草】"], [13, " 【サボテンの肉】"], [14, " 【動物の肉】"], [15, " 【癒しの草】、地形が火山なら【こげた草】"], [16, " 【癒しの草】、地形が火山なら【こげた草】、地形 が雪原なら【スノークリスタ草】"], [22, " 【スタミナ草】、地形が火山なら【こげた草】"], [23, " 【スタミナ草】、地形が火山なら【こげた草】、地 形が雪原なら【スノークリスタ草】"], [24, " 【触手の草】、地形が火山なら【こげた草】"], [25, " 【触手の草】、地形が火山なら【こげた草】、地形 が雪原なら【スノークリスタ草】"], [26, " 【スタミナのアンプル】"], [33, " 【癒しのアンプル】"], [34, " 【癒しのアンプル】"], [35, " 【ナユタの実】、地形が火山なら【こげた草】"], [36, " 【ナユタの実】、地形が火山なら【こげた草】"], [44, " 【火炎のアンプル】"], [45, " 【強酸のアンプル】"], [46, " 【とぶクスリ】"], [55, " 【竜炎のアンプル】"], [56, " 【おいしいお弁当】"], [66, " 【自然治癒のアンプル】"]]}), "DROPSC": $hash2(["name", "type", "table"], {"name": "巻物ドロップ表", "type": "D66", "table": [[11, " 【石壁の巻物】"], [12, " 【石壁の巻物】"], [13, " 【周辺の地図】"], [14, " 【周辺の地図】"], [15, " 【周辺の地図】"], [16, " 【火炎付与の巻物】"], [22, " 【混乱の巻物】"], [23, " 【剣の巻物】"], [24, " 【剣の巻物】"], [25, " 【鎧の巻物】"], [26, " 【鎧の巻物】"], [33, " 【応急修理の巻物】"], [34, " 【応急修理の巻物】"], [35, " 【移動不能付与の巻物】"], [36, " 【移動不能付与の巻物】"], [44, " 【宝の地図】"], [45, " 【宝の地図】"], [46, " 【召喚の巻物】"], [55, " 【剣の王の巻物】"], [56, " 【守りの神の巻物】"], [66, " 【高度修復の巻物】"]]}), "DROPOT": $hash2(["name", "type", "table"], {"name": "その他ドロップ表", "type": "D66", "table": [[11, " 【大きな石】、地形が火山なら【くすんだ宝石】"], [12, " 【大きな石】、地形が火山なら【くすんだ宝石】"], [13, " 【大きな石】、地形が火山なら【美しい宝石】"], [14, " 【木製の矢】"], [15, " 【理力の矢】"], [16, " 【鉄製の矢】"], [22, " 【投げナイフ】"], [23, " 【爆弾矢】"], [24, " 【くすんだ宝石】"], [25, " 【盾修復キット】"], [26, " 【上質の研ぎ石】"], [33, " 【エルザイト爆弾】"], [34, " 【セーブクリスタル】"], [35, " 【試練の腕輪】"], [36, " 【必殺の腕輪】"], [44, " 【破壊の腕輪】"], [45, " 【理力の腕輪】"], [46, " 【加速の腕輪】"], [55, " 【美しい宝石】"], [56, " 【封印のカギ】"], [66, " 【闇ギルド会員証】"]]}), "DROPP": $hash2(["name", "type", "table"], {"name": "ドロップアイテム表プラス", "type": "D66", "table": [[11, "武器ドロップ表", self.$getAddRollProc("DROPWP")], [12, "武器ドロップ表", self.$getAddRollProc("DROPWP")], [13, "武器ドロップ表2", self.$getAddRollProc("DROPWP2")], [14, "武器ドロップ表2", self.$getAddRollProc("DROPWP2")], [15, "防具ドロップ表", self.$getAddRollProc("DROPAR")], [16, "防具ドロップ表", self.$getAddRollProc("DROPAR")], [22, "防具ドロップ表2", self.$getAddRollProc("DROPAR2")], [23, "防具ドロップ表2", self.$getAddRollProc("DROPAR2")], [24, "食品ドロップ表", self.$getAddRollProc("DROPFD")], [25, "食品ドロップ表", self.$getAddRollProc("DROPFD")], [26, "食品ドロップ表2", self.$getAddRollProc("DROPFD2")], [33, "食品ドロップ表2", self.$getAddRollProc("DROPFD2")], [34, "薬品ドロップ表プラス", self.$getAddRollProc("DROPDRP")], [35, "薬品ドロップ表プラス", self.$getAddRollProc("DROPDRP")], [36, "巻物ドロップ表", self.$getAddRollProc("DROPSC")], [44, "巻物ドロップ表", self.$getAddRollProc("DROPSC")], [45, "巻物ドロップ表2", self.$getAddRollProc("DROPSC2")], [46, "巻物ドロップ表2", self.$getAddRollProc("DROPSC2")], [55, "その他ドロップ表", self.$getAddRollProc("DROPOT")], [56, "その他ドロップ表", self.$getAddRollProc("DROPOT")], [66, "その他ドロップ表2", self.$getAddRollProc("DROPOT2")]]}), "DROPDRP": $hash2(["name", "type", "table"], {"name": "薬品ドロップ表プラス", "type": "D66", "table": [[11, "【燃料油のビン】"], [12, "【燃料油のビン】"], [13, "【燃料油のビン】"], [14, "【弱体の薬】"], [15, "【弱体の薬】"], [16, "【弱体の薬】"], [22, "【成長の薬】"], [23, "【ベルセルクアンプル】"], [24, "【ベルセルクアンプル】"], [25, "【浮遊の薬】"], [26, "【浮遊の薬】"], [33, "【反動解消の薬】"], [34, "【反動解消の薬】"], [35, "【癒しの大ボトル】"], [36, "【癒しの大ボトル】"], [44, "【超元気のアンプル】"], [45, "【超元気のアンプル】"], [46, "【薬命酒】"], [55, "【薬命酒】"], [56, "【洗脳のクスリ】"], [66, "【洗脳のクスリ】"]]}), "DROPSC2": $hash2(["name", "type", "table"], {"name": "巻物ドロップ表2", "type": "D66", "table": [[11, "【火炎波の巻物】"], [12, "【悟りの巻物】"], [13, "【理盾の巻物】"], [14, "【泉の巻物】"], [15, "【雷神の巻物】"], [16, "【超激震の巻物】"], [22, "【闇を阻む巻物】"], [23, "【引きこもりの巻物】"], [24, "【鋼鉄の巻物】"], [25, "【回廊の巻物】"], [26, "【騎士団の巻物】"], [33, "【水泳能力の巻物】"], [34, "【浮遊能力の巻物】"], [35, "【治癒の書】"], [36, "【浮遊の書】"], [44, "【突風の書】"], [45, "【睡眠の書】"], [46, "【火炎の書】"], [55, "【鋼鉄の書】"], [56, "【加速の書】"], [66, "【闇払いの書】"]]}), "DROPWP2": $hash2(["name", "type", "table"], {"name": "武器ドロップ表2", "type": "D66", "table": [[11, "【さびた巨大斧】"], [12, "【さびた巨大斧】"], [13, "【モコモコのバトン】"], [14, "【モコモコのバトン】"], [15, "【ベルセルクアクス】"], [16, "【ベルセルクアクス】"], [22, "【クナイ】"], [23, "【クナイ】"], [24, "【術殺槍】"], [25, "【ウィンドスピア】"], [26, "【ウィンドスピア】"], [33, "【つるはし】"], [34, "【つるはし】"], [35, "【理力の剣】"], [36, "【蒼い短刀】"], [44, "【クリムゾンクロウ】"], [45, "【ナユタの杖】"], [46, "【ナユタの杖】"], [55, "【一撃斧】"], [56, "【ファイアブランド】"], [66, "【ソードクロスボウ】"]]}), "DROPAR2": $hash2(["name", "type", "table"], {"name": "防具ドロップ表2", "type": "D66", "table": [[11, "【ボロボロの服】"], [12, "【ボロボロの服】"], [13, "【穴だらけの鎧】"], [14, "【穴だらけの鎧】"], [15, "【木製の追加装甲】"], [16, "【木製の追加装甲】"], [22, "【ガラスの鎧】"], [23, "【ガラスの鎧】"], [24, "【鉄板の追加装甲】"], [25, "【鉄板の追加装甲】"], [26, "【太陽のランタン】"], [33, "【耐火服】"], [34, "【獣の革のバッグ】"], [35, "【重量ブーツ】"], [36, "【冒険者のブーツ】"], [44, "【ラバーブーツ】"], [45, "【風のマント】"], [46, "【狩人の服】"], [55, "【ドラゴンスケイル】"], [56, "【不育の腕輪】"], [66, "【竜革の大きなバッグ】"]]}), "DROPHWP": $hash2(["name", "type", "table"], {"name": "聖武具ドロップ表プラス", "type": "D66", "table": [[11, "【大気の盾】"], [23, "【聖剣カレドヴルフ】"], [36, "【紅蓮の書】"], [12, "【大気の盾】"], [24, "【聖斧エルサーベス】"], [44, "【聖弓ル・アルシャ】"], [13, "【大地の鎧】"], [25, "【聖斧エルサーベス】"], [45, "【聖弓ル・アルシャ】"], [14, "【大地の鎧】"], [26, "【聖槍ヴァルキウス】"], [46, "【聖なる月の剣】"], [15, "【水霊のマント】"], [33, "【聖槍ヴァルキウス】"], [55, "【紅き太陽の剣】"], [16, "【水霊のマント】"], [34, "【聖槍ヴァルキウス】"], [56, "【嵐の聖剣】"], [22, "【聖剣カレドヴルフ】"], [35, "【紅蓮の書】"], [66, "【超重の聖斧】"]]}), "DROPFD2": $hash2(["name", "type", "table"], {"name": "食品ドロップ表2", "type": "1D6", "table": [[1, "【解毒の草】、地形が火 山なら【こげた草】、地 形が海岸なら【おいし い海藻】"], [2, "【気付けの草】、地形が 火山なら【こげた草】、 地形が海岸なら【おい しい海藻】"], [3, "【夜目の草】"], [4, "【力が湧く草】"], [5, "【集中の草】"], [6, "【牛乳】"]]}), "DROPOT2": $hash2(["name", "type", "table"], {"name": "その他 ドロップ表2", "type": "2D6", "table": [[2, "【五連の矢】"], [3, "【炎の矢】"], [4, "【聖なる投げ刃】"], [5, "【物体破壊爆弾】"], [6, "【閃光弾】"], [7, "【聖なる短剣の破片】"], [8, "【閃光弾】"], [9, "【旋風の投げ刃】"], [10, "【スーパーエルザイト 爆弾】"], [11, "【炎の矢】"], [12, "【五連の矢】"]]}), "DROPRAREBOX2": $hash2(["name", "type", "table"], {"name": "珍しい箱ドロップ表2", "type": "2D6", "table": [[2, "聖武具ドロップ表プラ スへ"], [3, "【耐久力の結晶】"], [4, "【偉大な筋力の結晶】"], [5, "【偉大な敏捷の結晶】"], [6, "【偉大な生命の結晶】"], [7, "【竜鱗の追加装甲】"], [8, "【偉大な魅力の結晶】"], [9, "【偉大な意志の結晶】"], [10, "【偉大な知力の結晶】"], [11, "【スタミナの結晶】"], [12, "【闇払いの書】"]]}), "KNGFTP": $hash2(["name", "type", "table"], {"name": "王特徴表プラス", "type": "1D6", "table": [[1, "【力の王の】（０４７ページ）"], [2, "【力の王の】（０４７ページ）"], [3, "【疾風の王の】（０４７ページ）"], [4, "【疾風の王の】（０４７ページ）"], [5, "【炎の王の】（０４７ページ）"], [6, "【絶望の王の】（０４７ページ）"]]})}));
    return self.$setPrefixes($rb_plus(["\\d*JD.*", "RET\\d+", "RETP\\d+", "DNGN\\d+"], Opal.const_get_relative($nesting, 'TABLES').$keys()));
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting)
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
