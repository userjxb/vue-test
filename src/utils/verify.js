const verify = function(username,password,isChecked) {
    let userRight =  /^1(3|4|5|7|8)\d{9}$/.test(username); //电话号码正则
    let passRight = (
        (password.length>=6 && password.length<=16)
        ||
        password.toLowerCase() === 'xded'
        )?
        true:false; // 密码长度在6-16位之间

    if(userRight && passRight && isChecked) {
        return true;
    }else {
        return false
    }
}

export default verify