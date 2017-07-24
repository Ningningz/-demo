// 可观察者对象
var Observable = function (generator) {
  this._generator = generator;
};
// 可观测对象还需要提供一个方法供观测者连接，当连接发生时，为 观测者执行生成器
Observable.prototype.subscribe = function (observer) {
  this._generator.call(this, observer);
};
// 观察者
var Observer = function (consumer) {
  this._consumer = consumer;
};
// 观察者需要的预定义接口，可观测对象 将调用这个接口来传递通知
Observer.prototype.onNotify = function (data) {
  this._consumer.call(this, data);
};
window.onload = function () {
  var elClock = document.getElementById("clock");
  var getTime = function () {
    var _ = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'],  //补零
      d = new Date(), h = d.getHours(), m = d.getMinutes(), s = d.getSeconds();
    return [_[h] || h, _[m] || m, _[s] || s].join(":");
  };
  // 定义可观察者对象
  var tickStream = new Observable(function (observer) {
    setInterval(function () {
      // 提供数据
      observer.onNotify(getTime());
    }, 1000);
  });
  // 观察者
  var uiRefresher = new Observer(function (data) {
    elClock.textContent = data;
  });

  tickStream.subscribe(uiRefresher);
}
