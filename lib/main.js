// 条码 -> 邮编
class BarcodeToPostcode {

    //输入符号，输出对应的数字
    static toDigit(bar) {
        let digit = 0;
        let mul = [7, 4, 2, 1, 0];
        for (let i = 0; i < bar.length; i++)
            if (bar[i] == '|')
                digit += mul[i];
        return digit % 11;
    }

    //输入条码，输出完整的邮编
    static print(barcode) {
        let num = [];
        for (let i = 1; i < barcode.length - 10; i += 5)
            num.push(BarcodeToPostcode.toDigit(barcode.substring(i, i + 5)));
        let postcode = num.join('');
        if (postcode.length == 9)
            postcode = postcode.substring(0, 5) + '-' + postcode.substring(5, 9);
        return postcode;
    }

}


// 邮编 -> 条码

class PostcodeToBarcode {

    //输入数字，输出对应的符号
    static toBar(digit) {
        let bar = [];
        let div = [7, 4, 2, 1];
        let count = 0;
        if (digit == 0)
            digit += 11;
        for (let num of div) {
            if (digit / num >= 1) {
                bar.push('|');
                digit -= num;
                count++;
            }
            else
                bar.push(':');
        }
        if (count == 1)
            bar.push('|');
        else
            bar.push(':');
        return bar.join('');
    }

    //计算校验码CD
    static calCD(postcode) {
        let sum = 0;
        for (let i = 0; i < postcode.length; i++){
            if(postcode[i]=='-') i++;
            sum += parseInt(postcode[i]);
        }
        return PostcodeToBarcode.toBar((10 - sum % 10) % 10);
    }

    //输入邮编，输出完整的条码
    static print(postcode) {
        let barcode = [];
        let cd = PostcodeToBarcode.calCD(postcode);
        for (let i = 0; i < postcode.length; i++) {
            if(postcode[i]=='-') i++;
            barcode.push(PostcodeToBarcode.toBar(parseInt(postcode[i])));
        }
        return '|' + barcode.join('') + cd + '|';
    }

}


function main(code) {
    if (code.substring(0, 1) == '|')
        return BarcodeToPostcode.print(code);
    else
        return PostcodeToBarcode.print(code);

}

module.exports = main;
