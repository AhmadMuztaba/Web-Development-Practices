exports.tDate= function() {
    let today = new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long",
    };
    let day=today.toLocaleDateString("EN-US",options);
    return day;
}
exports.tDay=function() {
    let today = new Date();
    let options={
        weekday:"long",
    };
    let day=today.toLocaleDateString("EN-US",options);
    return day;
}