const tidyVietnamese = (s) => {
  var r = s.toLowerCase();
  r = r.replace(new RegExp(/-/g), " ");
  // Below are functions to render from Vietnamese characters
  r = r.replace(new RegExp(/æ/g), "ae");
  r = r.replace(new RegExp(/ç/g), "c");
  r = r.replace(new RegExp(/[áàạảãâấầậẩẫăắằặẳẵā]/g), "a");
  r = r.replace(new RegExp(/[éèẹẻẽêếềệểễ]/g), "e");
  r = r.replace(new RegExp(/[óòọỏõôốồộổỗơớờợởỡ]/g), "o");
  r = r.replace(new RegExp(/[ýỳỵỷỹ]/g), "y");
  r = r.replace(new RegExp(/[ìíîïịỉĩ]/g), "i");
  r = r.replace(new RegExp(/[úùụủũưứừựửữū]/g), "u");
  r = r.replace(new RegExp(/đ/g), "d");
  r = r.replace(new RegExp(/ð/g), "d");
  r = r.replace(new RegExp(/ñ/g), "n");
  r = r.replace(new RegExp(/œ/g), "oe");
  // Below are functions to render from Pali characters
  return r;
};

export default tidyVietnamese;
