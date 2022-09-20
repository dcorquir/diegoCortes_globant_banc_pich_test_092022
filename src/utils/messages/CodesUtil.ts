import { Code, Codes } from './Codes';

export class CodesUtils {

    public static format(code: Code, [params]: any): Code {
        if (code && params && params.length > 0) {
            code.message = this.parameterizedString(code.message, params);
        }
        return code;
    }

    /***
     * @example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
     * @return "my name is John and surname is Doe"
     *
     * @firstArgument {String} like "my name is %s1 and surname is %s2"
     * @otherArguments {String | Number}
     * @returns {String}
     */
    public static parameterizedString = (...args: string[]) => {
        const str = args[0];
        const params = args.filter((arg, index) => index !== 0);
        if (!str) return "";
        return str.replace(/%s[0-9]+/g, matchedStr => {
            const variableIndex = parseInt(matchedStr.replace("%s", "")) - 1;
            return params[variableIndex];
        });
    }
}