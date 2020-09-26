<template>
    <div class="container">
        <div class="wrapper-progress">
            <div class="progress-delivery"><span>1</span> Delivery</div>
            <div class="payment-delivery"><i class="fa fa-angle-right m-right-15" aria-hidden="true"></i><span>2</span> Payment <i class="fa fa-angle-right m-left-15" aria-hidden="true"></i></div>
            <div class="finish-delivery"><span>3</span> Finish</div>
        </div>
        <div class="row">
            <div class="column-10">
                <div class="container-thankyou">
                    <div class="wrapper-thankyou">
                        <div class="title">
                            <h1 class="flex-item">Thank you</h1>
                        </div>
                        <div class="f-bold"><p>Order ID: {{$data.code}}</p></div>
                        <div class="m-top-5 m-bottom-30">Your order will be delivered today with GO-SEND</div>
                        <div class="c-pointer"><i class="fa fa-angle-left m-right-15" aria-hidden="true" /><span>Go to Homepage</span></div>
                    </div>
                </div>
            </div>
            <div class="column-2">
                <h2>Summary</h2>
                <p>10 items purchased</p>
                <div class="wrapper-info">
                    <div class="list" />
                    <p class="mb-0">Delivery Estimation</p>
                    <p class="color-green">today by GO-SEND</p>
                </div>
                <div class="wrapper-info">
                    <div class="list" />
                    <p class="mb-0">Payment method</p>
                    <p class="color-green">Bank Transfer</p>
                </div>
                <div class="summary">
                    <div class="d-flex h-25">
                        <p>Cost of goods</p><p class="f-bold">500,000</p>
                    </div>
                    <div class="d-flex h-25">
                        <p>Dropshipping Fee</p><p class="f-bold">5,900</p>
                    </div>
                    <div class="d-flex h-25">
                        <p>GO-SEND shipment</p><p class="f-bold">5,900</p>
                    </div>
                    <div class="d-flex summary-total">
                        <p>Total</p><p>505,900</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    code: Math.random().toString(36).substr(2, 5).toUpperCase()
  })

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 2rem;
  height: auto;
  max-width: 86%;
  margin-top: 30px;
  margin-left: 60px;
  background-color: #ffffff;
  border-radius: 7px;
  padding-top: 0px;
  width: 86%;
}

.h-25 { height: 25px;}
.c-pointer { cursor: pointer;}
.f-bold { font-weight: bold;}
.m-right-15 { margin-right: 15px; }
.m-top-15 { margin-top: 15px; }
.m-top-5 { margin-top: 5px;}
.mb-0 { margin-bottom: 0px;}
.m-left-15 { margin-left: 15px; }
.m-bottom-30 { margin-bottom: 30px;}
.d-flex {
  display: flex;
  justify-content: space-between;
}

.container .wrapper-progress {
  display: flex;
  justify-content: center;
  background-color: #FFFAE6;
  max-width: 500px;
  margin-left: 340px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  padding: 0.4rem;
}

.container .wrapper-progress div {
  margin: 10px;
}

.column-10 .title {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
}

.column-10 .title h1 {
  color: #FF8A00;
  float: left;
  font-weight: bold;
  font-size: 3em;
}

.column-10 .title span {
  margin-top: 10px;
}

.column-10 .title span label {
  margin-left: 10px;
}

.wrapper-body span {
  float: right;
}

.wrapper-input {
  margin: 15px;
  position: relative;
}

.wrapper-input .md-box {
  height: 60px;
  width: 400px;
}

.wrapper-input .lg-box {
  height: 120px;
  width: 400px;
}

.wrapper-input .md-box-2 {
  height: 60px;
  width: 300px;
}

.summary {
  margin-top: 50px;
}

.summary-total {
  color: #FF8A00;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
}

.container .wrapper-progress .progress-delivery,
.container .wrapper-progress .payment-delivery,
.container .wrapper-progress .finish-delivery {
  color: #FF8A00;
}

.container .wrapper-progress .progress-delivery span,
.container .wrapper-progress .payment-delivery span,
.container .wrapper-progress .finish-delivery span {

background: #FF8A00;
box-shadow: 0 2px 4px 0 rgba(255,138,0,0.30);
border-radius: 50%;
font-family: Helvetica;
font-size: 16px;
color: #FF8A00;
letter-spacing: 0;
color: #FFFFFF;
text-align: center;
padding: 4px 8px;
}

.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;
}

.column-10 {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 73;
}

.column-2 {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 27;
  border-left: 2px solid #FFFAE6;
  margin-left: 10px;
}

.column-2 h2 {
  color: #FF8A00;
  padding-top: 15px;
  float: left;
  display: flex;
  padding-left: 20px;
  margin-bottom: 0px;
}

.column-2 p {
  display: flex;
  margin-left: 20px;
  margin-top: 0px;
}

.wrapper-thankyou {
  text-align: left;
  margin-top: 100px;
}

.container-thankyou {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.wrapper-thankyou .title {
  margin-bottom: 40px;
}

.wrapper-info {
  margin-top: 5px;
  padding-top: 5px;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
}

.wrapper-info .list {
  border-top: 2px solid #cecece;
  width: 100px;
  margin-left: 20px;
  margin-bottom: 20px;
}

.wrapper-info .color-green {
  font-size: 16px;
  color: #1BD97B;
  letter-spacing: 0;
  margin-top: 0px;
}

</style>
