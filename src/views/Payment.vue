<template>
    <div class="container">
        <div class="wrapper-progress">
            <div class="progress-delivery"><span>1</span> Delivery</div>
            <div class="payment-delivery"><i class="fa fa-angle-right m-right-15" aria-hidden="true"></i><span>2</span> Payment <i class="fa fa-angle-right m-left-15" aria-hidden="true"></i></div>
            <div class="finish-delivery"><span>3</span> Finish</div>
        </div>
        <div class="row">
            <div class="column-10">
                <div class="redirect"><i class="fa fa-angle-left m-right-15" aria-hidden="true" @click="redirectHome" /><span @click="redirectHome">Go to Homepage</span></div>
                <div class="form">
                    <div class="title">
                      <h1>Shipment</h1>
                    </div>
                    <section class="plan cf">
                      <input type="radio" name="gosend" @input="onChange($event)"  id="gosend" value="GO-SEND" v-model="delivery"><label class="free-label four col" for="gosend">GO-SEND<br /><span>15,000</span></label>
                      <input type="radio" name="jne" @input="onChange($event)"  id="jne" value="JNE" v-model="delivery"><label class="basic-label four col" for="jne">JNE<br /><span>9,000</span></label>
                      <input type="radio" name="personal" @input="onChange($event)"  id="personal" value="Personal Courier" v-model="delivery"><label class="premium-label four col" for="personal">Personal Courier <br /><span>29,000</span></label>
                    </section>
                </div>
                <div class="form">
                    <div class="title">
                      <h1>Payment</h1>
                    </div>
                    <section class="payment-type cf">
                      <input type="radio" name="radio3" id="ewallet" value="e-Wallet" v-model="payment"><label class="free-label four col" for="ewallet">e-Wallet<br /><span>1,500,000 left</span></label>
                      <input type="radio" name="radio3" id="bank" value="Bank Transfer" v-model="payment"><label class="basic-label four col lh-40" for="bank">Bank Transfer</label>
                      <input type="radio" name="radio3" id="va" value="Virtual Account" v-model="payment"><label class="premium-label four col lh-40" for="va">Virtual Account</label>
                    </section>
                </div>
            </div>
            <div class="column-2">
              <h2>Summary</h2>
              <p>10 items purchased</p>
              <div class="wrapper-info">
                <div class="list" />
                <p class="mb-0">Delivery Estimation</p>
                <p class="color-green">{{$data.estimation}} by {{$data.delivery}}</p>
              </div>
              <div class="summary">
                <div class="d-flex h-25">
                    <p>Cost of goods</p><p class="f-bold">{{parseInt(detail.cost).toLocaleString()}}</p>
                </div>
                <div class="d-flex h-25">
                    <p>Dropshipping Fee</p><p class="f-bold">{{parseInt(detail.fee).toLocaleString()}}</p>
                </div>
                <div class="d-flex h-25">
                    <p>{{$data.delivery}} shipment</p><p class="f-bold">{{parseInt($data.deliveryFee).toLocaleString()}}</p>
                </div>
                <div class="d-flex summary-total">
                    <p>Total</p><p>{{parseInt(detail.totalAmount + $data.deliveryFee).toLocaleString()}}</p>
                </div>
              </div>
              <button class="btn-payment" @click="submitPayment">Pay with {{$data.payment}}</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
const namespaced = true
export default {
  namespaced,
  name: 'Payment',
  props: {
    msg: String
  },
  data: () => ({
    payment: '',
    delivery: '',
    estimation: '',
    deliveryFee: 0,
    total: ''
  }),
  computed: {
    ...mapState({
      detail: 'checkoutDetail'
    }),
    ...mapGetters({
      detail: 'checkoutDetail'
    })
  },
  methods: {
    onChange: function (event) {
      const { value, name } = event.target
      this[name] = value

      if (value === 'GO-SEND') {
        this.estimation = 'today'
        this.deliveryFee = 15000
      } else if (value === 'JNE') {
        this.estimation = '2 days'
        this.deliveryFee = 9000
      } else {
        this.estimation = '1 day'
        this.deliveryFee = 29000
      }
    },
    submitPayment: function () {
      const payload = {
        payment: this.payment,
        delivery: this.delivery,
        deliveryFee: this.deliveryFee,
        estimation: this.estimation,
        totalAmount: this.deliveryFee + this.detail.totalAmount
      }
      this.$store.commit('addSummary', payload)
      this.$router.push('Finish')
    },
    redirectHome: function () {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  padding: 2rem;
  height: auto;
  max-width: 86%;
  margin-top: 50px;
  margin-left: 60px;
  background-color: #ffffff;
  border-radius: 7px;
  padding-top: 0px;
  width: 86%;
}

.redirect {
  cursor: pointer;
  display: flex;
}
.lh-40 { line-height: 40px !important;}
.h-25 { height: 25px;}
.f-bold { font-weight: bold;}
.m-right-15 { margin-right: 15px; }
.m-top-15 { margin-top: 15px; }
.m-left-15 { margin-left: 15px; }
.mb-0 { margin-bottom: 0px;}
.d-flex {
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
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
  margin-top: 100px;
}

.summary-total {
  color: #FF8A00;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
}

.btn-payment {
  background-color: #FF8A00;
  color: #FFFFFF;
  font-weight: bold;
  padding: 15px 65px;
  font-size: 16px;
  margin-left: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.container .wrapper-progress .progress-delivery,
.container .wrapper-progress .payment-delivery,
.container .wrapper-progress .finish-delivery {
  color: #FF8A00;
}

.container .wrapper-progress .progress-delivery span,
.container .wrapper-progress .payment-delivery span,
.container .wrapper-progress .finish-delivery span {
  box-shadow: 0 2px 4px 0 rgba(255,138,0,0.30);
  border-radius: 50%;
  font-family: Helvetica;
  font-size: 16px;
  letter-spacing: 0;
  text-align: center;
  padding: 4px 8px;
}

.container .wrapper-progress .finish-delivery span {
  background-color: #FFFAE6;
  color: #FF8A00;
}

.container .wrapper-progress .progress-delivery span,
.container .wrapper-progress .payment-delivery span {
  background-color: #FF8A00;
  color: #FFFFFF;
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
  padding-left: 20px;
  margin-top: 0px;
}

.inputText {
  font-size: 14px;
  width: 200px;
  height: 35px;
  border: 1px solid #cecece;
}

.float-label {
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 23px;
  transition: 0.2s ease all;
}

input:focus ~ .float-label,
input:not(:focus):valid ~ .float-label{
  top: 8px;
  bottom: 10px;
  left: 15px;
  font-size: 11px;
  opacity: 1;
}

.wrapper-info {
  margin-top: 20px;
  padding-top: 20px;
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

.four { width: 180px; max-width: 180px;}

/* COLUMNS */

.col {
  display: block;
  float:left;
  margin: 1% 0 1% 1.6%;
}

.col:first-of-type { margin-left: 0; }

/* CLEARFIX */

.cf:before,
.cf:after {
  content: " ";
  display: table;
}

.cf:after {
  clear: both;
}

.cf {
  *zoom: 1;
}

.form .plan,
.form .payment-type {
  display: flex;
  justify-content: flex-start;
  flex-flow: wrap;
}

.form .plan input, .form .payment-plan input, .form .payment-type input{
  display: none;
}

.form label{
  position: relative;
  /* color: #fff; */
  /* background-color: #aaa; */
  /* font-size: 26px; */
  text-align: left;
  height: 60px;
  line-height: 20px;
  display: block;
  cursor: pointer;
  border: 3px solid transparent;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-top: 7px;
  padding-left: 10px;

  background-color: #FFFFFF;
  border: 2px solid #CCCCCC;
  opacity: 0.6;
  font-family: Helvetica;
  font-size: 14px;
  color: #000000;
  letter-spacing: 0;
}

.form .plan input:checked + label, .form .payment-plan input:checked + label, .form .payment-type input:checked + label{
  /* border: 3px solid #333; */
  /* background-color: #2fcc71; */
  background: rgba(27,217,123,0.10);
  border: 2px solid #1BD97B;
  font-family: Helvetica;
  font-size: 15px;
  color: #1BD97B;
  letter-spacing: 0;
  opacity: 0.8;
  /* font-family: Helvetica;
  font-size: 13px;
  color: #000000;
  letter-spacing: 0;
  font-family: Helvetica;
  font-size: 16px;
  color: #2D2A40;
  letter-spacing: 0; */
}

.form .plan input:checked + label:after, form .payment-plan input:checked + label:after, .form .payment-type input:checked + label:after{
  content: "\2713";
  width: 40px;
  height: 40px;
  line-height: 63px;
  border-radius: 100%;
  z-index: 999;
  position: absolute;
  top: -6px;
  right: -15px;

}

.submit{
  padding: 15px 60px;
  display: inline-block;
  border: none;
  margin: 20px 0;
  background-color: #2fcc71;
  color: #fff;
  border: 2px solid #333;
  font-size: 18px;
  -webkit-transition: transform 0.3s ease-in-out;
  -o-transition: transform 0.3s ease-in-out;
  transition: transform 0.3s ease-in-out;
}

.submit:hover{
  cursor: pointer;
  transform: rotateX(360deg);
}

</style>
