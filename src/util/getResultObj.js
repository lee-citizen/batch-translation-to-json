// import genetator from "./generator";
// const getResultArray = (translateArray, options, optionState) => {
//   let resultArray = [];
//   options.map((tranlateId) => {
//     if (optionState[tranlateId]) {
//       resultArray.push(genetator[tranlateId](translateArray));
//     }
//   });
//   return resultArray;
// };
// export default getResultArray


import genetator from "./generator";

/*
 * 驼峰转换
 * @param string $name 要转换的字符串
 * @param int $type 转换方式，默认为0； 0:驼峰->下划线  1:下划线->驼峰
 * @return string 转换好的字符串
 */
function splitCamel(str){
	return str.replace(/([A-Z])/g,function(s){
		return ' '+s.toLowerCase();
	}).trim().split(' ');
}
function split_(str){
		return str.toLowerCase().trim().split('_');
}



const getResultObj = (translateObj, type) => {
  console.log( Object.keys(translateObj));
  console.log(genetator);
  let resultObj = {};

  Object.keys(translateObj).map((key)=>{
        console.log(key);
        if (key.indexOf('_') > -1) {
          var newKey = genetator[type](split_(key)).value;
        }else{
          var newKey = genetator[type](splitCamel(key)).value;
        }
        console.log(newKey);
        if(newKey){
          resultObj[newKey] = translateObj[key];
          delete translateObj[key];
        }
  })

  return resultObj;
};
export default getResultObj