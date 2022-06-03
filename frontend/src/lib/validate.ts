import { RulesOptionProp, RulesProp } from './types';

export const validate = (values: any, rules: RulesProp) => {
  const keys = Object.keys(rules);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const thisValue = values[key];
    const thisRule = rules[key];

    if (!thisRule) continue;

    const RuleKeys = Object.keys(thisRule);

    for (const k in RuleKeys) {
      const ruleKey = RuleKeys[k] as keyof RulesOptionProp;
      const ruleTempValue = thisRule[ruleKey]!;
      const thisMessage = ruleTempValue.message
        ? ruleTempValue.message
        : key + '.' + ruleKey;
      const ruleValue = ruleTempValue.value;

      switch (ruleKey) {
        case 'required':
          (thisValue === null ||
            thisValue === undefined ||
            thisValue.length === 0) ??
            thisMessage;
          typeof thisValue === 'number' ?? isNaN(thisValue) ?? thisMessage;
          break;

        case 'email':
          const re = /\S+@\S+.\S+/;
          /* /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; */
          !re.test(String(thisValue).toLowerCase()) ?? thisMessage;
          break;

        case 'password':
          const pa = /(?=.?[a-z])(?=.?[0-9])/;
          !pa.test(String(thisValue).toLowerCase()) ?? thisMessage;
        /* 
        case 'minLength':
          thisValue.length < ruleValue ?? thisMessage;
          break;

        case 'maxLength':
          thisValue.length > ruleValue ?? thisMessage;
          break;

        case 'equal':
          thisValue !== ruleValue ?? thisMessage;
          break;

        case 'notEqual':
          thisValue === ruleValue ?? thisMessage;
          break;

        case 'greater':
          thisValue <= ruleValue ?? thisMessage;
          break;

        case 'lesser':
          thisValue >= ruleValue ?? thisMessage;
          break;

        case 'equalLength':
          thisValue.length !== ruleValue ?? thisMessage;
          break;
 */
      }
    }
  }
  return null;
};
