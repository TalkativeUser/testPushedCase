
/**
 * يقوم بقص النص إلى طول محدد.
 * @param {string} txt - النص الذي يجب قصه.
 * @param {number} [max=50] - الحد الأقصى لطول النص المقصود. القيمة الافتراضية هي 50.
 * @returns {string} - النص المقصود.
 */


export function txtSlicer (txt:string,max:number=50) {

    if(txt.length>=max) 
    return ` ${txt.slice(0,max) } ...`

    return txt


}



