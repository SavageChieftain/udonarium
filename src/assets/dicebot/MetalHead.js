/* Generated by Opal 1.0.3 */
Opal.modules["utils/ArithmeticEvaluator"] = function(Opal) {
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_divide(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs / rhs : lhs['$/'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send;

  Opal.add_stubs(['$tokenize', '$expr', '$private', '$split', '$gsub', '$mul', '$loop', '$consume', '$+', '$-', '$unary', '$*', '$div', '$zero?', '$===', '$ceil', '$/', '$to_f', '$round', '$floor', '$-@', '$term', '$expect', '$expect_number', '$!=', '$[]', '$integer?', '$to_i', '$!', '$nil?', '$match']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'ArithmeticEvaluator');

    var $nesting = [self].concat($parent_nesting), $ArithmeticEvaluator_eval$1, $ArithmeticEvaluator_tokenize$2, $ArithmeticEvaluator_add$4, $ArithmeticEvaluator_mul$6, $ArithmeticEvaluator_div$8, $ArithmeticEvaluator_unary$9, $ArithmeticEvaluator_term$10, $ArithmeticEvaluator_consume$11, $ArithmeticEvaluator_expect$12, $ArithmeticEvaluator_expect_number$13, $ArithmeticEvaluator_integer$ques$14;

    self.$$prototype.error = self.$$prototype.round_type = self.$$prototype.tokens = self.$$prototype.idx = nil;
    
    
    Opal.def(self, '$eval', $ArithmeticEvaluator_eval$1 = function(expr, round_type) {
      var self = this, ret = nil;

      
      
      if (round_type == null) {
        round_type = "omit";
      };
      self.tokens = self.$tokenize(expr);
      self.idx = 0;
      self.error = false;
      self.round_type = round_type;
      ret = self.$expr();
      if ($truthy(self.error)) {
        return 0
      } else {
        return ret
      };
    }, $ArithmeticEvaluator_eval$1.$$arity = -2);
    self.$private();
    
    Opal.def(self, '$tokenize', $ArithmeticEvaluator_tokenize$2 = function $$tokenize(expr) {
      var $$3, self = this;

      return $send(expr, 'gsub', [/[\(\)\+\-\*\/]/], ($$3 = function(e){var self = $$3.$$s || this;

      
        
        if (e == null) {
          e = nil;
        };
        return "" + " " + (e) + " ";}, $$3.$$s = self, $$3.$$arity = 1, $$3)).$split(" ")
    }, $ArithmeticEvaluator_tokenize$2.$$arity = 1);
    
    Opal.def(self, '$add', $ArithmeticEvaluator_add$4 = function $$add() {
      var $$5, self = this, ret = nil;

      
      ret = self.$mul();
      (function(){var $brk = Opal.new_brk(); try {return $send(self, 'loop', [], ($$5 = function(){var self = $$5.$$s || this;

      if ($truthy(self.$consume("+"))) {
          return (ret = $rb_plus(ret, self.$mul()))
        } else if ($truthy(self.$consume("-"))) {
          return (ret = $rb_minus(ret, self.$mul()))
        } else {
          
          Opal.brk(nil, $brk)
        }}, $$5.$$s = self, $$5.$$brk = $brk, $$5.$$arity = 0, $$5))
      } catch (err) { if (err === $brk) { return err.$v } else { throw err } }})();
      return ret;
    }, $ArithmeticEvaluator_add$4.$$arity = 0);
    Opal.alias(self, "expr", "add");
    
    Opal.def(self, '$mul', $ArithmeticEvaluator_mul$6 = function $$mul() {
      var $$7, self = this, ret = nil;

      
      ret = self.$unary();
      (function(){var $brk = Opal.new_brk(); try {return $send(self, 'loop', [], ($$7 = function(){var self = $$7.$$s || this;

      if ($truthy(self.$consume("*"))) {
          return (ret = $rb_times(ret, self.$unary()))
        } else if ($truthy(self.$consume("/"))) {
          return (ret = self.$div(ret, self.$unary()))
        } else {
          
          Opal.brk(nil, $brk)
        }}, $$7.$$s = self, $$7.$$brk = $brk, $$7.$$arity = 0, $$7))
      } catch (err) { if (err === $brk) { return err.$v } else { throw err } }})();
      return ret;
    }, $ArithmeticEvaluator_mul$6.$$arity = 0);
    
    Opal.def(self, '$div', $ArithmeticEvaluator_div$8 = function $$div(left, right) {
      var self = this, $case = nil;

      
      if ($truthy(right['$zero?']())) {
        
        self.error = true;
        return 0;};
      return (function() {$case = self.round_type;
      if ("roundUp"['$===']($case)) {return $rb_divide(left.$to_f(), right).$ceil()}
      else if ("roundOff"['$===']($case)) {return $rb_divide(left.$to_f(), right).$round()}
      else {return $rb_divide(left, right).$floor()}})();
    }, $ArithmeticEvaluator_div$8.$$arity = 2);
    
    Opal.def(self, '$unary', $ArithmeticEvaluator_unary$9 = function $$unary() {
      var self = this;

      if ($truthy(self.$consume("+"))) {
        return self.$unary()
      } else if ($truthy(self.$consume("-"))) {
        return self.$unary()['$-@']()
      } else {
        return self.$term()
      }
    }, $ArithmeticEvaluator_unary$9.$$arity = 0);
    
    Opal.def(self, '$term', $ArithmeticEvaluator_term$10 = function $$term() {
      var self = this, ret = nil;

      if ($truthy(self.$consume("("))) {
        
        ret = self.$expr();
        self.$expect(")");
        return ret;
      } else {
        return self.$expect_number()
      }
    }, $ArithmeticEvaluator_term$10.$$arity = 0);
    
    Opal.def(self, '$consume', $ArithmeticEvaluator_consume$11 = function $$consume(str) {
      var self = this;

      
      if ($truthy(self.tokens['$[]'](self.idx)['$!='](str))) {
        return false};
      self.idx = $rb_plus(self.idx, 1);
      return true;
    }, $ArithmeticEvaluator_consume$11.$$arity = 1);
    
    Opal.def(self, '$expect', $ArithmeticEvaluator_expect$12 = function $$expect(str) {
      var self = this;

      
      if ($truthy(self.tokens['$[]'](self.idx)['$!='](str))) {
        self.error = true};
      return (self.idx = $rb_plus(self.idx, 1));
    }, $ArithmeticEvaluator_expect$12.$$arity = 1);
    
    Opal.def(self, '$expect_number', $ArithmeticEvaluator_expect_number$13 = function $$expect_number() {
      var self = this, ret = nil;

      
      if ($truthy(self['$integer?'](self.tokens['$[]'](self.idx)))) {
      } else {
        
        self.error = true;
        self.idx = $rb_plus(self.idx, 1);
        return 0;
      };
      ret = self.tokens['$[]'](self.idx).$to_i();
      self.idx = $rb_plus(self.idx, 1);
      return ret;
    }, $ArithmeticEvaluator_expect_number$13.$$arity = 0);
    return (Opal.def(self, '$integer?', $ArithmeticEvaluator_integer$ques$14 = function(str) {
      var self = this;

      return /^\d+$/.$match(str)['$nil?']()['$!']()
    }, $ArithmeticEvaluator_integer$ques$14.$$arity = 1), nil) && 'integer?';
  })($nesting[0], null, $nesting)
};

/* Generated by Opal 1.0.3 */
Opal.modules["utils/range_table"] = function(Opal) {
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  function $rb_times(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs * rhs : lhs['$*'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $send = Opal.send, $truthy = Opal.truthy;

  Opal.add_stubs(['$new', '$alias_method', '$freeze', '$lambda', '$name', '$sum', '$content', '$attr_reader', '$match', '$raise', '$to_i', '$[]', '$store', '$find', '$include?', '$range', '$roll', '$map', '$split', '$to_proc', '$fetch', '$formatted=', '$-', '$private', '$coerce_to_int_range', '$sort_by', '$min', '$assert_min_sum_is_covered', '$assert_max_sum_is_covered', '$assert_no_gap_or_overlap_in_ranges', '$===', '$is_a?', '$begin', '$end', '$class', '$first', '$*', '$last', '$each_cons', '$max', '$+']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'RangeTable');

    var $nesting = [self].concat($parent_nesting), $RangeTable$1, $RangeTable$2, $RangeTable_initialize$3, $RangeTable_fetch$4, $RangeTable_roll$6, $RangeTable_store$7, $RangeTable_coerce_to_int_range$11, $RangeTable_assert_min_sum_is_covered$12, $RangeTable_assert_max_sum_is_covered$13, $RangeTable_assert_no_gap_or_overlap_in_ranges$14;

    self.$$prototype.name = self.$$prototype.items = self.$$prototype.num_of_dice = self.$$prototype.num_of_sides = self.$$prototype.formatter = nil;
    
    Opal.const_set($nesting[0], 'RollResult', $send($$($nesting, 'Struct'), 'new', ["sum", "values", "content", "formatted"], ($RangeTable$1 = function(){var self = $RangeTable$1.$$s || this;

    return self.$alias_method("to_s", "formatted")}, $RangeTable$1.$$s = self, $RangeTable$1.$$arity = 0, $RangeTable$1)));
    Opal.const_set($nesting[0], 'Item', $$($nesting, 'Struct').$new("range", "content"));
    Opal.const_set($nesting[0], 'DICE_ROLL_METHOD_RE', /^(\d+)D(\d+)$/i.$freeze());
    Opal.const_set($nesting[0], 'DEFAULT_FORMATTER', $send(self, 'lambda', [], ($RangeTable$2 = function(table, result){var self = $RangeTable$2.$$s || this;

    
      
      if (table == null) {
        table = nil;
      };
      
      if (result == null) {
        result = nil;
      };
      return "" + (table.$name()) + "(" + (result.$sum()) + ") ＞ " + (result.$content());}, $RangeTable$2.$$s = self, $RangeTable$2.$$arity = 2, $RangeTable$2)));
    self.$attr_reader("name");
    self.$attr_reader("num_of_dice");
    self.$attr_reader("num_of_sides");
    
    Opal.def(self, '$initialize', $RangeTable_initialize$3 = function $$initialize(name, dice_roll_method, items) {
      var $iter = $RangeTable_initialize$3.$$p, formatter = $iter || nil, $a, self = this, m = nil;

      if ($iter) $RangeTable_initialize$3.$$p = null;
      
      
      if ($iter) $RangeTable_initialize$3.$$p = null;;
      self.name = name.$freeze();
      self.formatter = ($truthy($a = formatter) ? $a : $$($nesting, 'DEFAULT_FORMATTER'));
      m = $$($nesting, 'DICE_ROLL_METHOD_RE').$match(dice_roll_method);
      if ($truthy(m)) {
      } else {
        self.$raise($$($nesting, 'ArgumentError'), "" + (self.name) + ": invalid dice roll method: " + (dice_roll_method))
      };
      self.num_of_dice = m['$[]'](1).$to_i();
      self.num_of_sides = m['$[]'](2).$to_i();
      return self.$store(items);
    }, $RangeTable_initialize$3.$$arity = 3);
    
    Opal.def(self, '$fetch', $RangeTable_fetch$4 = function $$fetch(value) {
      var $$5, self = this, item = nil;

      
      item = $send(self.items, 'find', [], ($$5 = function(i){var self = $$5.$$s || this;

      
        
        if (i == null) {
          i = nil;
        };
        return i.$range()['$include?'](value);}, $$5.$$s = self, $$5.$$arity = 1, $$5));
      if ($truthy(item)) {
      } else {
        self.$raise($$($nesting, 'RangeError'), "" + (self.name) + ": value is out of range: " + (value))
      };
      return item;
    }, $RangeTable_fetch$4.$$arity = 1);
    
    Opal.def(self, '$roll', $RangeTable_roll$6 = function $$roll(bcdice) {
      var $a, $b, self = this, sum = nil, values_str = nil, values = nil, result = nil, $writer = nil;

      
      $b = bcdice.$roll(self.num_of_dice, self.num_of_sides), $a = Opal.to_ary($b), (sum = ($a[0] == null ? nil : $a[0])), (values_str = ($a[1] == null ? nil : $a[1])), $b;
      values = $send(values_str.$split(","), 'map', [], "to_i".$to_proc());
      result = $$($nesting, 'RollResult').$new(sum, values, self.$fetch(sum).$content());
      
      $writer = [self.formatter['$[]'](self, result)];
      $send(result, 'formatted=', Opal.to_a($writer));
      $writer[$rb_minus($writer["length"], 1)];;
      return result;
    }, $RangeTable_roll$6.$$arity = 1);
    self.$private();
    
    Opal.def(self, '$store', $RangeTable_store$7 = function $$store(items) {
      var $$8, $$9, $$10, self = this, items_with_range = nil, sorted_items = nil;

      
      items_with_range = $send(items, 'map', [], ($$8 = function(r, c){var self = $$8.$$s || this;

      
        
        if (r == null) {
          r = nil;
        };
        
        if (c == null) {
          c = nil;
        };
        return [self.$coerce_to_int_range(r), c];}, $$8.$$s = self, $$8.$$arity = 2, $$8));
      sorted_items = $send(items_with_range, 'sort_by', [], ($$9 = function(r, _){var self = $$9.$$s || this;

      
        
        if (r == null) {
          r = nil;
        };
        
        if (_ == null) {
          _ = nil;
        };
        return r.$min();}, $$9.$$s = self, $$9.$$arity = 2, $$9));
      self.$assert_min_sum_is_covered(sorted_items);
      self.$assert_max_sum_is_covered(sorted_items);
      self.$assert_no_gap_or_overlap_in_ranges(sorted_items);
      self.items = $send(sorted_items, 'map', [], ($$10 = function(range, content){var self = $$10.$$s || this;

      
        
        if (range == null) {
          range = nil;
        };
        
        if (content == null) {
          content = nil;
        };
        return $$($nesting, 'Item').$new(range, content.$freeze()).$freeze();}, $$10.$$s = self, $$10.$$arity = 2, $$10)).$freeze();
      return self;
    }, $RangeTable_store$7.$$arity = 1);
    
    Opal.def(self, '$coerce_to_int_range', $RangeTable_coerce_to_int_range$11 = function $$coerce_to_int_range(x) {
      var $a, self = this, $case = nil;

      
      $case = x;
      if ($$($nesting, 'Integer')['$===']($case)) {return $$($nesting, 'Range').$new(x, x)}
      else if ($$($nesting, 'Range')['$===']($case)) {if ($truthy(($truthy($a = x.$begin()['$is_a?']($$($nesting, 'Integer'))) ? x.$end()['$is_a?']($$($nesting, 'Integer')) : $a))) {
        return x}};
      return self.$raise($$($nesting, 'TypeError'), "" + (self.name) + ": " + (x) + " (" + (x.$class()) + ") must be an Integer or a Range with Integers ");
    }, $RangeTable_coerce_to_int_range$11.$$arity = 1);
    
    Opal.def(self, '$assert_min_sum_is_covered', $RangeTable_assert_min_sum_is_covered$12 = function $$assert_min_sum_is_covered(sorted_items) {
      var self = this, min_sum = nil, range = nil;

      
      min_sum = self.num_of_dice;
      range = sorted_items.$first()['$[]'](0);
      if ($truthy(range['$include?'](min_sum))) {
      } else {
        self.$raise($$($nesting, 'RangeError'), "" + (self.name) + ": min value (" + (min_sum) + ") is not covered: " + (range))
      };
      return self;
    }, $RangeTable_assert_min_sum_is_covered$12.$$arity = 1);
    
    Opal.def(self, '$assert_max_sum_is_covered', $RangeTable_assert_max_sum_is_covered$13 = function $$assert_max_sum_is_covered(sorted_items) {
      var self = this, max_sum = nil, range = nil;

      
      max_sum = $rb_times(self.num_of_dice, self.num_of_sides);
      range = sorted_items.$last()['$[]'](0);
      if ($truthy(range['$include?'](max_sum))) {
      } else {
        self.$raise($$($nesting, 'RangeError'), "" + (self.name) + ": max value (" + (max_sum) + ") is not covered: " + (range))
      };
      return self;
    }, $RangeTable_assert_max_sum_is_covered$13.$$arity = 1);
    return (Opal.def(self, '$assert_no_gap_or_overlap_in_ranges', $RangeTable_assert_no_gap_or_overlap_in_ranges$14 = function $$assert_no_gap_or_overlap_in_ranges(sorted_items) {
      var $$15, self = this;

      
      $send(sorted_items, 'each_cons', [2], ($$15 = function(i1, i2){var self = $$15.$$s || this, r1 = nil, r2 = nil, max1 = nil, next_of_max1 = nil;
        if (self.name == null) self.name = nil;

      
        
        if (i1 == null) {
          i1 = nil;
        };
        
        if (i2 == null) {
          i2 = nil;
        };
        r1 = i1['$[]'](0);
        r2 = i2['$[]'](0);
        max1 = r1.$max();
        next_of_max1 = $rb_plus(max1, 1);
        if ($truthy(r2['$include?'](max1))) {
          self.$raise($$($nesting, 'RangeError'), "" + (self.name) + ": Range overlap: " + (r1) + " and " + (r2))};
        if ($truthy(r2['$include?'](next_of_max1))) {
          return nil
        } else {
          return self.$raise($$($nesting, 'RangeError'), "" + (self.name) + ": Range gap: " + (r1) + " and " + (r2))
        };}, $$15.$$s = self, $$15.$$arity = 2, $$15));
      return self;
    }, $RangeTable_assert_no_gap_or_overlap_in_ranges$14.$$arity = 1), nil) && 'assert_no_gap_or_overlap_in_ranges';
  })($nesting[0], null, $nesting)
};

/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_gt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs > rhs : lhs['$>'](rhs);
  }
  function $rb_lt(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs < rhs : lhs['$<'](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  function $rb_minus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs - rhs : lhs['$-'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy, $send = Opal.send, $hash2 = Opal.hash2, $range = Opal.range;

  Opal.add_stubs(['$require', '$setPrefixes', '$roll_tables', '$===', '$last_match', '$mh_crc_table', '$eval', '$new', '$to_sym', '$rollHit', '$gsub', '$!=', '$==', '$>=', '$<=', '$roll', '$getHitResult', '$getResult', '$%', '$debug', '$>', '$upcase', '$to_s', '$to_i', '$<', '$join', '$+', '$-', '$nil?', '$[]', '$each', '$push', '$lambda', '$name', '$sum', '$content', '$freeze', '$to_proc']);
  
  self.$require("utils/ArithmeticEvaluator");
  self.$require("utils/range_table");
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'MetalHead');

    var $nesting = [self].concat($parent_nesting), $MetalHead_rollDiceCommand$1, $MetalHead_changeText$2, $MetalHead_check_2D6$5, $MetalHead_rollHit$6, $MetalHead_check_1D100$7, $MetalHead_getHitResult$8, $MetalHead_getResult$9, $MetalHead_mh_crc_table$10, $MetalHead$13;

    self.$$prototype.fractionType = nil;
    
    Opal.const_set($nesting[0], 'ID', "MetalHead");
    Opal.const_set($nesting[0], 'NAME', "メタルヘッド");
    Opal.const_set($nesting[0], 'SORT_KEY', "めたるへつと");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "・アビリティロール  AR>=目標値\n" + "・スキルロール      SR<=目標値(%)\n" + "・命中判定ロール    HR<=目標値(%)\n" + "\n" + "  例）AR>=5\n" + "  例）SR<=(40+25)\n" + "  例）HR<=(50-10)\n" + "\n" + "  これらのロールで成否、絶対成功/絶対失敗、クリティカル/アクシデントを自動判定します。\n" + "\n" + "・クリティカルチャート  CC\n" + "・アクシデントチャート  射撃・投擲用:ACL  格闘用:ACS\n" + "・戦闘結果チャート      CRCsn   s=耐久レベル(SUV) n=数値\n" + "\n" + "  例）CRCA61 SUV=Aを対象とした数値61(62に変換される)の戦闘結果を参照する。\n" + "  例）CRCM98 対物で数値98の戦闘結果を参照する。\n");
    self.$setPrefixes(["AR", "SR", "HR<=.+", "CC", "ACT", "ACL", "ACS", "CRC[A-Z]\\d+"]);
    
    Opal.def(self, '$rollDiceCommand', $MetalHead_rollDiceCommand$1 = function $$rollDiceCommand(command) {
      var self = this, result = nil, $case = nil, suv = nil, num = nil, target = nil;

      
      result = self.$roll_tables(command, $$($nesting, 'TABLES'));
      if ($truthy(result)) {
        return result};
      $case = command;
      if (/^CRC(\w)(\d+)$/['$===']($case)) {
      suv = $$($nesting, 'Regexp').$last_match(1);
      num = $$($nesting, 'Regexp').$last_match(2);
      return self.$mh_crc_table(suv, num);}
      else if (/^HR<=(.+)/['$===']($case)) {
      target = $$($nesting, 'ArithmeticEvaluator').$new().$eval($$($nesting, 'Regexp').$last_match(1), self.fractionType.$to_sym());
      return self.$rollHit(target);};
      return nil;
    }, $MetalHead_rollDiceCommand$1.$$arity = 1);
    
    Opal.def(self, '$changeText', $MetalHead_changeText$2 = function $$changeText(string) {
      var $$3, $$4, self = this;

      
      string = $send(string, 'gsub', [/^(S)?AR/i], ($$3 = function(){var self = $$3.$$s || this;

      return "" + ($$($nesting, 'Regexp').$last_match(1)) + "2D6"}, $$3.$$s = self, $$3.$$arity = 0, $$3));
      string = $send(string, 'gsub', [/^(S)?SR/i], ($$4 = function(){var self = $$4.$$s || this;

      return "" + ($$($nesting, 'Regexp').$last_match(1)) + "1D100"}, $$4.$$s = self, $$4.$$arity = 0, $$4));
      return string;
    }, $MetalHead_changeText$2.$$arity = 1);
    
    Opal.def(self, '$check_2D6', $MetalHead_check_2D6$5 = function $$check_2D6(total, dice_total, _dice_list, cmp_op, target) {
      var $a, self = this;

      
      if ($truthy(($truthy($a = cmp_op['$!='](">=")) ? $a : target['$==']("?")))) {
        return ""};
      if ($truthy($rb_ge(dice_total, 12))) {
        return " ＞ 絶対成功"
      } else if ($truthy($rb_le(dice_total, 2))) {
        return " ＞ 絶対失敗"
      } else if ($truthy($rb_ge(total, target))) {
        return " ＞ 成功"
      } else {
        return " ＞ 失敗"
      };
    }, $MetalHead_check_2D6$5.$$arity = 5);
    
    Opal.def(self, '$rollHit', $MetalHead_rollHit$6 = function $$rollHit(target) {
      var $a, $b, self = this, total = nil, resultText = nil, text = nil;

      
      $b = self.$roll(1, 100), $a = Opal.to_ary($b), (total = ($a[0] == null ? nil : $a[0])), $b;
      resultText = self.$getHitResult(total, total, target);
      text = "" + "(1D100<=" + (target) + ") ＞ " + (total) + (resultText);
      return text;
    }, $MetalHead_rollHit$6.$$arity = 1);
    
    Opal.def(self, '$check_1D100', $MetalHead_check_1D100$7 = function $$check_1D100(total, dice_total, cmp_op, target) {
      var self = this;

      
      if (target['$==']("?")) {
        return ""};
      if (cmp_op['$==']("<=")) {
      } else {
        return ""
      };
      return self.$getResult(total, dice_total, target);
    }, $MetalHead_check_1D100$7.$$arity = 4);
    
    Opal.def(self, '$getHitResult', $MetalHead_getHitResult$8 = function $$getHitResult(total_n, _dice_n, diff) {
      var self = this, diceValue = nil, dice1 = nil;

      
      diceValue = total_n['$%'](100);
      dice1 = diceValue['$%'](10);
      self.$debug("total_n", total_n);
      if ($truthy($rb_gt(total_n, diff))) {
        return " ＞ 失敗"};
      if (dice1['$=='](1)) {
        return " ＞ 成功（クリティカル）"};
      if (dice1['$=='](0)) {
        return " ＞ 失敗（アクシデント）"};
      return " ＞ 成功";
    }, $MetalHead_getHitResult$8.$$arity = 3);
    
    Opal.def(self, '$getResult', $MetalHead_getResult$9 = function $$getResult(total_n, dice_n, diff) {
      var self = this;

      
      if ($truthy($rb_le(dice_n, 5))) {
        return " ＞ 絶対成功"};
      if ($truthy($rb_ge(dice_n, 96))) {
        return " ＞ 絶対失敗"};
      if ($truthy($rb_le(total_n, diff))) {
        return " ＞ 成功"};
      return " ＞ 失敗";
    }, $MetalHead_getResult$9.$$arity = 3);
    
    Opal.def(self, '$mh_crc_table', $MetalHead_mh_crc_table$10 = function $$mh_crc_table(suv, num) {
      var $$11, self = this, header_parts = nil, separator = nil, numbuf = nil, num_d1 = nil, table_point = nil, table_damage = nil, damage_level = nil, result_parts = nil;

      
      header_parts = ["戦闘結果チャート", num];
      separator = " ＞ ";
      suv = suv.$to_s().$upcase();
      numbuf = num.$to_i();
      if ($truthy($rb_lt(numbuf, 1))) {
        return $rb_plus(header_parts, ["数値が不正です"]).$join(separator)};
      num_d1 = numbuf['$%'](10);
      self.$debug("" + "num_d1[" + (num_d1) + "]");
      if (num_d1['$=='](1)) {
        numbuf = $rb_plus(numbuf, 1)};
      if (num_d1['$=='](0)) {
        numbuf = $rb_minus(numbuf, 1)};
      num_d1 = numbuf['$%'](10);
      self.$debug("" + "num_d1[" + (num_d1) + "]");
      table_point = [nil, nil, "腕部", "腕部", "脚部", "脚部", "胴部", "胴部", "胴部", "頭部"];
      table_damage = $hash2(["S", "A", "B", "C", "D", "E", "F", "G", "M"], {"S": [$hash2(["N"], {"N": 2}), $hash2(["LW"], {"LW": 16}), $hash2(["MD"], {"MD": 46}), $hash2(["MW"], {"MW": 56}), $hash2(["HD"], {"HD": 76}), $hash2(["HW"], {"HW": 96}), $hash2(["MO"], {"MO": 106}), $hash2(["K"], {"K": 116})], "A": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 46}), $hash2(["HW"], {"HW": 76}), $hash2(["MO"], {"MO": 96}), $hash2(["K"], {"K": 116})], "B": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 36}), $hash2(["HW"], {"HW": 66}), $hash2(["MO"], {"MO": 96}), $hash2(["K"], {"K": 106})], "C": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 26}), $hash2(["HW"], {"HW": 66}), $hash2(["MO"], {"MO": 86}), $hash2(["K"], {"K": 106})], "D": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 26}), $hash2(["HW"], {"HW": 46}), $hash2(["MO"], {"MO": 76}), $hash2(["K"], {"K": 96})], "E": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 26}), $hash2(["HW"], {"HW": 39}), $hash2(["MO"], {"MO": 54}), $hash2(["K"], {"K": 76})], "F": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 16}), $hash2(["HW"], {"HW": 39}), $hash2(["MO"], {"MO": 54}), $hash2(["K"], {"K": 66})], "G": [$hash2(["LW"], {"LW": 2}), $hash2(["MW"], {"MW": 6}), $hash2(["HW"], {"HW": 16}), $hash2(["MO"], {"MO": 26}), $hash2(["K"], {"K": 39})], "M": [$hash2(["0"], {"0": 2}), $hash2(["1"], {"1": 22}), $hash2(["2"], {"2": 42}), $hash2(["3"], {"3": 62}), $hash2(["4"], {"4": 82}), $hash2(["5"], {"5": 92}), $hash2(["6"], {"6": 102}), $hash2(["8"], {"8": 112})]});
      if ($truthy(table_damage['$[]'](suv)['$nil?']())) {
        return $rb_plus(header_parts, ["" + "耐久レベル(SUV)[" + (suv) + "]", "耐久レベル(SUV)の値が不正です"]).$join(separator)};
      damage_level = "";
      $send(table_damage['$[]'](suv), 'each', [], ($$11 = function(v){var self = $$11.$$s || this, $$12;

      
        
        if (v == null) {
          v = nil;
        };
        return $send(v, 'each', [], ($$12 = function(d, n){var self = $$12.$$s || this;

        
          
          if (d == null) {
            d = nil;
          };
          
          if (n == null) {
            n = nil;
          };
          self.$debug("" + "suv[" + (suv) + "] " + (v) + " " + (d) + " " + (n));
          if ($truthy($rb_le(n, numbuf))) {
            return (damage_level = d)
          } else {
            return nil
          };}, $$12.$$s = self, $$12.$$arity = 2, $$12));}, $$11.$$s = self, $$11.$$arity = 1, $$11));
      result_parts = [];
      if ($truthy(numbuf['$!='](num.$to_i()))) {
        result_parts.$push(numbuf.$to_s())};
      if (suv['$==']("M")) {
        result_parts.$push("耐物", "" + "HP[" + (damage_level) + "]")
      } else {
        result_parts.$push("" + "耐久レベル(SUV)[" + (suv) + "]", "" + "部位[" + (table_point['$[]'](num_d1)) + "] ： 損傷種別[" + (damage_level) + "]")
      };
      return $rb_plus(header_parts, result_parts).$join(separator);
    }, $MetalHead_mh_crc_table$10.$$arity = 2);
    Opal.const_set($nesting[0], 'TABLE_ROLL_RESULT_FORMATTER', $send(self, 'lambda', [], ($MetalHead$13 = function(table, result){var self = $MetalHead$13.$$s || this;

    
      
      if (table == null) {
        table = nil;
      };
      
      if (result == null) {
        result = nil;
      };
      return [table.$name(), result.$sum(), result.$content()].$join(" ＞ ");}, $MetalHead$13.$$s = self, $MetalHead$13.$$arity = 2, $MetalHead$13)));
    return Opal.const_set($nesting[0], 'TABLES', $hash2(["CC", "ACL", "ACS"], {"CC": $send($$($nesting, 'RangeTable'), 'new', ["クリティカルチャート", "1D10", [[1, "相手は知覚系に多大なダメージを受けた。PERを1にして頭部にHWのダメージ、および心理チェック。"], [2, "相手の運動神経を断ち切った。DEXを1にして腕部にHWのダメージ、および心理チェック。さらに腕に持っていた武器などは落としてしまう。"], [3, "相手の移動手段は完全に奪われた。REFを1にして脚部にHWダメージと心理チェック。また、次回からのこちらの攻撃は必ず命中する。"], [$range(4, 5, false), "相手の急所に命中。激痛のため気絶した上、胴にHWダメージ。"], [6, "効果的な一撃。胴にHWダメージ。心理チェック。"], [7, "効果的な一撃。胴にMOダメージ。心理チェック。"], [$range(8, 10, false), "君の一撃は相手の中枢を完全に破壊した。即死である。"]]], $$($nesting, 'TABLE_ROLL_RESULT_FORMATTER').$to_proc()), "ACL": $send($$($nesting, 'RangeTable'), 'new', ["アクシデントチャート（射撃・投擲）", "1D10", [[$range(1, 7, false), "ささいなミス。特にペナルティーはない。"], [8, "不発、またはジャム。弾を取り出さねばならない物は次のターンは射撃できない。"], [9, "ささいな故障。可能なら次のターンから個別武器のスキルロールで修理を行える。"], [10, "武器の暴発、または爆発。頭部HWの心理効果ロール。さらに、その武器は破壊されPERとDEXのどちらか、または両方に計2ポイントのマイナスを与える。（遠隔操作の場合、射手への被害は無し）"]]], $$($nesting, 'TABLE_ROLL_RESULT_FORMATTER').$to_proc()), "ACS": $send($$($nesting, 'RangeTable'), 'new', ["アクシデントチャート（格闘）", "1D10", [[$range(1, 3, false), "足を滑らせて転倒し、起き上がるまで相手に+20の命中修正を与える。"], [$range(4, 6, false), "手を滑らせて、武器を落とす。素手の時は関係ない。"], [$range(7, 9, false), "使用武器の破壊。素手戦闘のときはMWのダメージを受ける。"], [10, "手を滑らせ、不幸にも武器は飛んでいき、5m以内に人がいれば誰かに刺さるか、または打撃を与えるかもしれない。ランダムに決定し、普通どおり判定を続ける。素手のときは関係ない。"]]], $$($nesting, 'TABLE_ROLL_RESULT_FORMATTER').$to_proc())}).$freeze());
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting);
})(Opal);
