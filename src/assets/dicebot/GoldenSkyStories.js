/* Generated by Opal 0.11.4 */
(function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$setPrefixes', '$debug', '$===', '$getaRoll', '$empty?', '$roll', '$collect', '$split', '$to_i', '$+', '$[]']);
  return (function($base, $super, $parent_nesting) {
    function $GoldenSkyStories(){};
    var self = $GoldenSkyStories = $klass($base, $super, 'GoldenSkyStories', $GoldenSkyStories);

    var def = self.$$proto, $nesting = [self].concat($parent_nesting), TMP_GoldenSkyStories_initialize_1, TMP_GoldenSkyStories_gameName_2, TMP_GoldenSkyStories_gameType_3, TMP_GoldenSkyStories_getHelpMessage_4, TMP_GoldenSkyStories_isGetOriginalMessage_5, TMP_GoldenSkyStories_rollDiceCommand_6, TMP_GoldenSkyStories_getaRoll_8;

    
    self.$setPrefixes(["geta"]);
    
    Opal.defn(self, '$initialize', TMP_GoldenSkyStories_initialize_1 = function $$initialize() {
      var self = this, $iter = TMP_GoldenSkyStories_initialize_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_i = nil, $zuper_ii = nil;

      if ($iter) TMP_GoldenSkyStories_initialize_1.$$p = null;
      // Prepare super implicit arguments
      for($zuper_i = 0, $zuper_ii = arguments.length, $zuper = new Array($zuper_ii); $zuper_i < $zuper_ii; $zuper_i++) {
        $zuper[$zuper_i] = arguments[$zuper_i];
      }
      return $send(self, Opal.find_super_dispatcher(self, 'initialize', TMP_GoldenSkyStories_initialize_1, false), $zuper, $iter)
    }, TMP_GoldenSkyStories_initialize_1.$$arity = 0);
    
    Opal.defn(self, '$gameName', TMP_GoldenSkyStories_gameName_2 = function $$gameName() {
      var self = this;

      return "ゆうやけこやけ"
    }, TMP_GoldenSkyStories_gameName_2.$$arity = 0);
    
    Opal.defn(self, '$gameType', TMP_GoldenSkyStories_gameType_3 = function $$gameType() {
      var self = this;

      return "GoldenSkyStories"
    }, TMP_GoldenSkyStories_gameType_3.$$arity = 0);
    
    Opal.defn(self, '$getHelpMessage', TMP_GoldenSkyStories_getHelpMessage_4 = function $$getHelpMessage() {
      var self = this;

      return "" + "※「ゆうやけこやけ」はダイスロールを使用しないシステムです。\n" + "※このダイスボットは部屋のシステム名表示用となります。\n" + "\n" + "・下駄占い (GETA)\n" + "  あーしたてんきになーれ\n"
    }, TMP_GoldenSkyStories_getHelpMessage_4.$$arity = 0);
    
    Opal.defn(self, '$isGetOriginalMessage', TMP_GoldenSkyStories_isGetOriginalMessage_5 = function $$isGetOriginalMessage() {
      var self = this;

      return true
    }, TMP_GoldenSkyStories_isGetOriginalMessage_5.$$arity = 0);
    
    Opal.defn(self, '$rollDiceCommand', TMP_GoldenSkyStories_rollDiceCommand_6 = function $$rollDiceCommand(command) {
      var self = this, result = nil, $case = nil;

      
      self.$debug("rollDiceCommand command", command);
      result = "";
      $case = command;
      if (/geta/i['$===']($case)) {result = self.$getaRoll()};
      if ($truthy(result['$empty?']())) {
        return nil};
      return "" + (command) + " ＞ " + (result);
    }, TMP_GoldenSkyStories_rollDiceCommand_6.$$arity = 1);
    return (Opal.defn(self, '$getaRoll', TMP_GoldenSkyStories_getaRoll_8 = function $$getaRoll() {
      var $a, $b, TMP_7, self = this, result = nil, _ = nil, diceText = nil, diceList = nil, getaString = nil, $case = nil;

      
      result = "";
      $b = self.$roll(1, 7), $a = Opal.to_ary($b), (_ = ($a[0] == null ? nil : $a[0])), (diceText = ($a[1] == null ? nil : $a[1])), $b;
      diceList = $send(diceText.$split(/,/), 'collect', [], (TMP_7 = function(i){var self = TMP_7.$$s || this;
if (i == null) i = nil;
      return i.$to_i()}, TMP_7.$$s = self, TMP_7.$$arity = 1, TMP_7));
      result = $rb_plus(result, "下駄占い ＞ ");
      getaString = "";
      $case = diceList['$[]'](0);
      if ((1)['$===']($case)) {getaString = "裏：あめ"}
      else if ((2)['$===']($case)) {getaString = "表：はれ"}
      else if ((3)['$===']($case)) {getaString = "裏：あめ"}
      else if ((4)['$===']($case)) {getaString = "表：はれ"}
      else if ((5)['$===']($case)) {getaString = "裏：あめ"}
      else if ((6)['$===']($case)) {getaString = "表：はれ"}
      else if ((7)['$===']($case)) {getaString = "横：くもり"};
      result = $rb_plus(result, getaString);
      return result;
    }, TMP_GoldenSkyStories_getaRoll_8.$$arity = 0), nil) && 'getaRoll';
  })($nesting[0], Opal.const_get_relative($nesting, 'DiceBot'), $nesting)
})(Opal);

/* Generated by Opal 0.11.4 */
(function(Opal) {
  var self = Opal.top, $nesting = [], nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return Opal.const_get_relative($nesting, 'Kernel').$exit()
})(Opal);
