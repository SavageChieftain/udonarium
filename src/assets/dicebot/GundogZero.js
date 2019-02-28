/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;

  Opal.add_stubs(['$==', '$>=', '$<=', '$to_i', '$/', '$-', '$*', '$+']);
  return (function($base, $super, $parent_nesting) {
    function $Gundog(){};
    var self = $Gundog = $klass($base, $super, 'Gundog', $Gundog);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_Gundog_gameName_1, TMP_Gundog_gameType_2, TMP_Gundog_getHelpMessage_3, TMP_Gundog_check_1D100_4, TMP_Gundog_isD9_5;

    
    
    Opal.defn(self, '$gameName', TMP_Gundog_gameName_1 = function $$gameName() {
      var self = this;

      return "ガンドッグ"
    }, TMP_Gundog_gameName_1.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_Gundog_gameType_2 = function $$gameType() {
      var self = this;

      return "Gundog"
    }, TMP_Gundog_gameType_2.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_Gundog_getHelpMessage_3 = function $$getHelpMessage() {
      var self = this;

      return "" + "失敗、成功、クリティカル、ファンブルとロールの達成値の自動判定を行います。\n" + "nD9ロールも対応。\n"
    }, TMP_Gundog_getHelpMessage_3.$$arity = 0);
    
    Opal.defn(self, '$check_1D100', TMP_Gundog_check_1D100_4 = function $$check_1D100(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var self = this, dig10 = nil, dig1 = nil;

      
      if ($truthy(signOfInequality['$==']("<="))) {
        } else {
        return ""
      };
      if ($truthy($rb_ge(total_n, 100))) {
        return " ＞ ファンブル"};
      if ($truthy($rb_le(total_n, 1))) {
        return " ＞ 絶対成功(達成値1+SL)"};
      if ($truthy($rb_le(total_n, diff))) {
        
        dig10 = $rb_divide(total_n, 10).$to_i();
        dig1 = $rb_minus(total_n, $rb_times(dig10, 10));
        if ($truthy($rb_ge(dig10, 10))) {
          dig10 = 0};
        if ($truthy($rb_ge(dig1, 10))) {
          dig1 = 0};
        if ($truthy($rb_le(dig1, 0))) {
          return " ＞ クリティカル(達成値20+SL)"};
        return "" + " ＞ 成功(達成値" + ($rb_plus(dig10, dig1)) + "+SL)";};
      return " ＞ 失敗";
    }, TMP_Gundog_check_1D100_4.$$arity = 8);
    return (Opal.defn(self, '$isD9', TMP_Gundog_isD9_5 = function $$isD9() {
      var self = this;

      return true
    }, TMP_Gundog_isD9_5.$$arity = 0), nil) && 'isD9';
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting)
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
Opal.loaded(["diceBot/Gundog"]);
/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $gvars = Opal.gvars;

  Opal.add_stubs(['$require', '$setPrefixes', '$upcase', '$=~', '$to_i', '$parren_killer', '$getDamageTypeAndTable', '$getFumbleTypeAndTable', '$empty?', '$+', '$rand', '$<', '$>', '$[]', '$===']);
  
  self.$require("diceBot/Gundog");
  return (function($base, $super, $parent_nesting) {
    function $GundogZero(){};
    var self = $GundogZero = $klass($base, $super, 'GundogZero', $GundogZero);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_GundogZero_gameName_1, TMP_GundogZero_gameType_2, TMP_GundogZero_getHelpMessage_3, TMP_GundogZero_rollDiceCommand_4, TMP_GundogZero_getDamageTypeAndTable_5, TMP_GundogZero_getFumbleTypeAndTable_6;

    
    self.$setPrefixes(["(.DPT|.FT)\\d*"]);
    
    Opal.defn(self, '$gameName', TMP_GundogZero_gameName_1 = function $$gameName() {
      var self = this;

      return "ガンドッグ・ゼロ"
    }, TMP_GundogZero_gameName_1.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_GundogZero_gameType_2 = function $$gameType() {
      var self = this;

      return "GundogZero"
    }, TMP_GundogZero_gameType_2.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_GundogZero_getHelpMessage_3 = function $$getHelpMessage() {
      var self = this;

      return "" + "失敗、成功、クリティカル、ファンブルとロールの達成値の自動判定を行います。\n" + "nD9ロールも対応。\n" + "・ダメージペナルティ表　　(〜DPTx) (x:修正)\n" + "　射撃(SDPT)、格闘(MDPT)、車両(VDPT)、汎用(GDPT)の各表を引くことが出来ます。\n" + "　修正を後ろに書くことも出来ます。\n" + "・ファンブル表　　　　　　(〜FTx)  (x:修正)\n" + "　射撃(SFT)、格闘(MFT)、投擲(TFT)の各表を引くことが出来ます。\n" + "　修正を後ろに書くことも出来ます。\n"
    }, TMP_GundogZero_getHelpMessage_3.$$arity = 0);
    
    Opal.defn(self, '$rollDiceCommand', TMP_GundogZero_rollDiceCommand_4 = function $$rollDiceCommand(command) {
      var $a, $b, self = this, string = nil, table = nil, ttype = nil, type = nil, dice = nil, mod = nil, head = nil, diceOriginalText = nil, output = nil;

      
      string = command.$upcase();
      table = [];
      ttype = "";
      type = "";
      dice = 0;
      mod = 0;
      if ($truthy(/(\w)DPT([\+\-\d]*)/i['$=~'](string))) {
        
        ttype = "ダメージペナルティー";
        head = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1));
        if ($truthy((($a = $gvars['~']) === nil ? nil : $a['$[]'](2)))) {
          mod = self.$parren_killer("" + "(0" + ((($a = $gvars['~']) === nil ? nil : $a['$[]'](2))) + ")").$to_i()};
        $b = self.$getDamageTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      if ($truthy(/(\w)FT([\+\-\d]*)/i['$=~'](string))) {
        
        ttype = "ファンブル";
        head = (($a = $gvars['~']) === nil ? nil : $a['$[]'](1));
        if ($truthy((($a = $gvars['~']) === nil ? nil : $a['$[]'](2)))) {
          mod = self.$parren_killer("" + "(0" + ((($a = $gvars['~']) === nil ? nil : $a['$[]'](2))) + ")").$to_i()};
        $b = self.$getFumbleTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      if ($truthy(type['$empty?']())) {
        return "1"};
      dice = $rb_plus($rb_plus(self.$rand(10), self.$rand(10)), mod);
      diceOriginalText = dice;
      if ($truthy($rb_lt(dice, 0))) {
        dice = 0};
      if ($truthy($rb_gt(dice, 18))) {
        dice = 18};
      output = "" + (type) + (ttype) + "表[" + (diceOriginalText) + "] ＞ " + (table['$[]'](dice));
      return output;
    }, TMP_GundogZero_rollDiceCommand_4.$$arity = 1);
    
    Opal.defn(self, '$getDamageTypeAndTable', TMP_GundogZero_getDamageTypeAndTable_5 = function $$getDamageTypeAndTable(head) {
      var $a, $b, self = this, $case = nil, type = nil, table = nil;

      
      $case = head;
      if ("S"['$===']($case)) {
      type = "射撃";
      table = ["対象は[死亡]", "[追加D]4D6/[出血]2D6/[重傷]-30％/[朦朧判定]15", "[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]14", "[追加D]3D6/[出血]2D6/[重傷]-20％/[朦朧判定]14", "[追加D]3D6/[出血]1D6/[重傷]-20％/[朦朧判定]12", "[追加D]2D6/[出血]1D6/[重傷]-10％/[朦朧判定]12", "[追加D]2D6/[軽傷]-20％/[朦朧判定]10", "[追加D]2D6/[軽傷]-10％/[朦朧判定]10", "[追加D]2D6/[軽傷]-20％/[朦朧判定]8", "[追加D]2D6/[軽傷]-20％/[朦朧判定]6", "[追加D]2D6/[軽傷]-10％/[朦朧判定]4", "[追加D]1D6/[軽傷]-20％", "[追加D]1D6/[軽傷]-20％", "[追加D]1D6/[軽傷]-10％", "[軽傷]-20％", "[軽傷]-10％", "[軽傷]-10％", "手に持った武器を落とす", "ペナルティー無し"];}
      else if ("M"['$===']($case)) {
      type = "格闘";
      table = ["対象は[死亡]", "[追加D]3D6/[出血]2D6/[重傷]-30％/[朦朧判定]15", "[追加D]2D6/[出血]2D6/[重傷]-30％/[朦朧判定]14", "[追加D]2D6/[出血]1D6/[重傷]-20％/[朦朧判定]14", "[追加D]3D6/[出血]1D6/[重傷]-10％/[朦朧判定]12", "[追加D]2D6/[軽傷]-20％/[朦朧判定]12", "[追加D]2D6/[軽傷]-10％/[朦朧判定]12", "[追加D]2D6/[軽傷]-10％/[朦朧判定]10", "[追加D]1D6/[軽傷]-20％/[朦朧判定]8", "[追加D]1D6/[軽傷]-10％/[朦朧判定]8", "[追加D]1D6/[軽傷]-10％/[朦朧判定]6", "[軽傷]-20％/[朦朧判定]6", "[軽傷]-10％/[朦朧判定]6", "[軽傷]-10％/[朦朧判定]4", "[軽傷]-20％", "[軽傷]-10％", "[軽傷]-10％", "手に持った武器を落とす", "ペナルティー無し"];}
      else if ("V"['$===']($case)) {
      type = "車両";
      table = ["[クラッシュ]する。[チェイス]から除外", "[乗員D]3D6/[操縦性]-20％/[スピン判定]", "[乗員D]3D6/[操縦性]-20％/[スピン判定]", "[乗員D]2D6/[操縦性]-10％/[スピン判定]", "[乗員D]2D6/[操縦性]-10％/[スピン判定]", "[乗員D]3D6/[スピード]-2/[スピン判定]", "[乗員D]3D6/[スピード]-2/[スピン判定]", "[乗員D]2D6/[スピード]-1/[スピン判定]", "[乗員D]2D6/[スピード]-1/[スピン判定]", "[乗員D]2D6/[操縦判定]-20％", "[乗員D]2D6/[操縦判定]-20％", "[乗員D]1D6/[操縦判定]-10％", "[乗員D]1D6/[操縦判定]-10％", "[スピン判定]", "[スピン判定]", "乗員に[ショック]-20％", "乗員に[ショック]-10％", "乗員に[ショック]-10％", "ペナルティー無し"];}
      else if ("G"['$===']($case)) {
      type = "汎用";
      table = ["対象は[死亡]", "[追加D]4D6/[出血]2D6/[重傷]-30％/[朦朧判定]18", "[追加D]4D6/[出血]2D6/[重傷]-30％/[朦朧判定]16", "[追加D]3D6/[出血]2D6/[重傷]-20％/[朦朧判定]14", "[追加D]3D6/[出血]2D6/[重傷]-20％/[朦朧判定]14", "[追加D]3D6/[出血]1D6/[重傷]-10％/[朦朧判定]12", "[追加D]2D6/[出血]1D6/[重傷]-10％/[朦朧判定]12", "[追加D]2D6/[軽傷]-30％/[朦朧判定]12", "[追加D]2D6/[軽傷]-30％/[朦朧判定]10", "[追加D]2D6/[軽傷]-30％/[朦朧判定]8", "[追加D]2D6/[軽傷]-20％/[朦朧判定]8", "[追加D]2D6/[軽傷]-20％/[朦朧判定]6", "[追加D]2D6/[軽傷]-10％/[朦朧判定]6", "[追加D]1D6/[軽傷]-20％/[朦朧判定]4", "[追加D]1D6/[軽傷]-20％", "[追加D]1D6/[軽傷]-10％", "[軽傷]-20％", "[軽傷]-10％", "ペナルティー無し"];}
      else {
      head = "S";
      $b = self.$getDamageTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      return [type, table];
    }, TMP_GundogZero_getDamageTypeAndTable_5.$$arity = 1);
    return (Opal.defn(self, '$getFumbleTypeAndTable', TMP_GundogZero_getFumbleTypeAndTable_6 = function $$getFumbleTypeAndTable(head) {
      var $a, $b, self = this, $case = nil, type = nil, table = nil;

      
      $case = head;
      if ("S"['$===']($case)) {
      type = "射撃";
      table = ["銃器が暴発、自分に命中。[貫通D]", "銃器が暴発、自分に命中。[非貫通D]", "誤射。ランダムに味方に命中。[貫通D]", "誤射。ランダムに味方に命中。[非貫通D]", "銃器が完全に故障", "銃器が完全に故障", "故障。〈メカニック〉判定に成功するまで射撃不可", "故障。〈メカニック〉判定に成功するまで射撃不可", "作動不良。[アイテム使用]を2回行って修理するまで射撃不可", "作動不良。[アイテム使用]を2回行って修理するまで射撃不可", "作動不良。[アイテム使用]を行って修理するまで射撃不可", "作動不良。[アイテム使用]を行って修理するまで射撃不可", "姿勢を崩す。[不安定]", "姿勢を崩す。[不安定]", "姿勢を崩す。[ショック]-20％", "姿勢を崩す。[ショック]-20％", "姿勢を崩す。[ショック]-10％", "姿勢を崩す。[ショック]-10％", "ペナルティー無し"];}
      else if ("M"['$===']($case)) {
      type = "格闘";
      table = ["避けられて[転倒]、[朦朧]状態", "ランダムに[至近距離]の味方(居なければ自分)に命中。[貫通D]", "ランダムに[至近距離]の味方(居なければ自分)に命中。[貫通D]", "武器が完全に壊れる", "武器がガタつく。〈手先〉判定に成功するまで使用不可", "武器がガタつく。〈手先〉判定に成功するまで使用不可", "無理な姿勢で筋を伸ばす。[軽傷]-30％", "無理な姿勢で筋を伸ばす。[軽傷]-30％", "無理な姿勢で筋を伸ばす。[軽傷]-20％", "無理な姿勢で筋を伸ばす。[軽傷]-20％", "無理な姿勢で筋を伸ばす。[軽傷]-10％", "無理な姿勢で筋を伸ばす。[軽傷]-10％", "姿勢を崩す。[不安定]", "姿勢を崩す。[不安定]", "姿勢を崩す。[ショック]-20％", "姿勢を崩す。[ショック]-20％", "姿勢を崩す。[ショック]-10％", "姿勢を崩す。[ショック]-10％", "ペナルティー無し"];}
      else if ("T"['$===']($case)) {
      type = "投擲";
      table = ["[転倒]、[朦朧]状態", "自分に命中。[貫通D]", "自分に命中。[非貫通D]", "ランダムに味方(居なければ自分)に命中。[非貫通D]", "ランダムに味方(居なければ自分)に命中。[非貫通D]", "武器が完全に壊れる", "武器が完全に壊れる", "腰を痛める。[軽傷]-30％", "肩を痛める。[軽傷]-20％", "肩を痛める。[軽傷]-20％", "肘に違和感。[軽傷]-10％", "肘に違和感。[軽傷]-10％", "姿勢を崩す。[不安定]", "姿勢を崩す。[不安定]", "姿勢を崩す。[ショック]-20％", "姿勢を崩す。[ショック]-20％", "姿勢を崩す。[ショック]-10％", "姿勢を崩す。[ショック]-10％", "ペナルティー無し"];}
      else {
      head = "S";
      $b = self.$getFumbleTypeAndTable(head), $a = Opal.to_ary($b), (type = ($a[0] == null ? nil : $a[0])), (table = ($a[1] == null ? nil : $a[1])), $b;};
      return [type, table];
    }, TMP_GundogZero_getFumbleTypeAndTable_6.$$arity = 1), nil) && 'getFumbleTypeAndTable';
  })($nesting[0], Opal.const_get_relative($nesting, 'Gundog'), $nesting);
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
