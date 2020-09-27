<template>
    <div class="container">
        <div class="wrapper-progress">
            <div class="progress-delivery"><span>1</span> Delivery</div>
            <div class="payment-delivery"><i class="fa fa-angle-right m-right-15" aria-hidden="true"></i><span>2</span> Payment <i class="fa fa-angle-right m-left-15" aria-hidden="true"></i></div>
            <div class="finish-delivery"><span>3</span> Finish</div>
        </div>
        <div class="row">
            <div class="column-10">
                <div class="title">
                    <h1>Delivery Detail</h1>
                    <span class="checkbox">
                        <input type="checkbox" id="check-box" name="check-box" class="" v-model="isChecked" @change="onChange($event)"/>
                        <label for="check-box" class="">Send as dropshipper</label>
                    </span>
                </div>
                <div class="row">
                    <div class="column">
                        <div class="wrapper-input">
                            <input v-model="user.email" @input="onChange($event)" type="text" name="email" :class="['input-text md-box', isEmailValid()]" required autocomplete="off"/>
                            <label class="float-label">Email</label>
                        </div>
                        <div class="wrapper-input">
                            <input v-model="user.phone" @input="onChange($event)" type="number" :class="['input-text md-box', isPhoneValid()]" name="phone" required autocomplete="off"/>
                            <label class="float-label">Phone Number</label>
                        </div>
                        <div class="wrapper-input">
                            <textarea v-model="user.address" @input="onChange($event)" type="text" name="address" class="input-text lg-box" required autocomplete="off" :disabled="user.address.length >= 120"/>
                            <label class="float-label">Delivery Address</label>
                            <p v-if="user.address.length > 0">{{120 - $data.user.address.length}} characters left</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="wrapper-input">
                            <input v-model="user.dropshiperName" @input="onChange($event)" type="text" name="dropshiperName" class="input-text md-box-2" :disabled="!isChecked" required autocomplete="off"/>
                            <label class="float-label">Dropshipper name</label>
                        </div>
                        <div class="wrapper-input">
                            <input v-model="user.dropshiperPhone" @input="onChange($event)" type="number" name="dropshiperPhone" :class="['input-text md-box-2', isPhoneDropshipperValid()]" :disabled="!isChecked" required autocomplete="off"/>
                            <label class="float-label">Dropshipper phone number</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column-2">
                <h2>Summary</h2>
                <p>{{$data.user.items}} items purchased</p>
                <div class="summary">
                    <div class="d-flex">
                        <p>Cost of goods</p><p class="f-bold">{{parseInt(detail.cost).toLocaleString()}}</p>
                    </div>
                    <div class="d-flex">
                        <p>Dropshipping Fee</p><p class="f-bold">{{parseInt($data.user.fee).toLocaleString()}}</p>
                    </div>
                    <div class="d-flex summary-total">
                        <p>Total</p><p>{{parseInt($data.user.cost).toLocaleString()}}</p>
                    </div>
                    <button class="btn-payment" @click="submitForm" :disabled="user.email === '' || user.phone === ''|| user.number === ''">Continue to Payment</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Delivery',
  props: {
    msg: String
  },
  data: () => ({
    isChecked: false,
    user: {
      email: '',
      phone: '',
      address: '',
      dropshiperName: '',
      dropshiperPhone: '',
      items: 10,
      cost: 500000,
      fee: 0
    },
    payload: {}
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
      const { value, name, checked } = event.target
      this[name] = value

      if (name === 'check-box') {
        if (checked === true) {
          this.user.fee = 5900
          this.user.cost = 505900
        } else {
          this.user.fee = 0
          this.user.cost = 500000
        }
      }
    },
    submitForm: function () {
      const payload = {
        fee: this.user.fee
      }
      const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      const phoneRegex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/
      if (emailRegex.test(this.user.email) && phoneRegex.test(this.user.phone)) {
        this.$store.commit('addProduct', payload)
        this.$router.push('Payment')
      } else {
        alert('Submit error')
      }
    },
    isEmailValid: function () {
      const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
      return (this.user.email === '') ? '' : (emailRegex.test(this.user.email)) ? 'has-success' : 'has-error'
    },
    isPhoneValid: function () {
      const phoneRegex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/
      const phone = this.user.phone
      return (phone === '') ? '' : (phoneRegex.test(phone)) && (phone.length >= 6 || phone.length <= 20) ? 'has-success' : 'has-error'
    },
    isPhoneDropshipperValid: function () {
      const phoneRegex = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/
      const phone = this.user.dropshiperPhone
      return (phone === '') ? '' : (phoneRegex.test(phone)) && (phone.length >= 6 || phone.length <= 20) ? 'has-success' : 'has-error'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="css">
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

.f-bold { font-weight: bold;}
.m-right-15 { margin-right: 15px; }
.m-top-15 { margin-top: 15px; }
.m-left-15 { margin-left: 15px; }
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
  font-size: 2.5em !important;
  border-bottom: 4px solid #cecece;
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
  height: 50px;
  width: 400px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.wrapper-input .lg-box {
  height: 90px;
  width: 400px;
  max-width: 400px;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
}

.wrapper-input .md-box-2 {
  height: 50px;
  width: 260px;
  padding-top: 10px;
  padding-left: 20px;
  padding-right: 20px;
}

.summary {
  margin-top: 200px;
}

.summary-total {
  color: #FF8A00;
  margin-top: 30px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
}

.btn-payment {
  background-color: #FF8A00;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 16px;
  padding: 15px 65px;
  margin-left: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.checkbox {
  position: relative;
  display: block;
}

.checkbox input[type="checkbox"] {
  width: auto;
  opacity: 0.00000001;
  position: absolute;
  left: 0;
  margin-left: -20px;
}
.checkbox label {
  position: relative;
  padding-top: 6px;
}
.checkbox label:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  margin: 4px;
  width: 22px;
  height: 22px;
  transition: transform 0.28s ease;
  border-radius: 3px;
  border: 2px solid #32db1b;
}
.checkbox label:after {
  content: '';
  display: block;
  width: 10px;
  height: 5px;
  border-bottom: 2px solid #32db1b;
  border-left: 2px solid #32db1b;
  -webkit-transform: rotate(-45deg) scale(0);
  transform: rotate(-45deg) scale(0);
  transition: transform ease 0.25s;
  will-change: transform;
  position: absolute;
  top: 12px;
  left: 10px;
}
.checkbox input[type="checkbox"]:checked ~ label::before {
  color: #32db1b;
}

.checkbox input[type="checkbox"]:checked ~ label::after {
  -webkit-transform: rotate(-45deg) scale(1);
  transform: rotate(-45deg) scale(1);
}

.checkbox label {
  min-height: 34px;
  display: block;
  padding-left: 40px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
  vertical-align: sub;
}
.checkbox label span {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.checkbox input[type="checkbox"]:focus + label::before {
  outline: 0;
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

.container .wrapper-progress .payment-delivery span,
.container .wrapper-progress .finish-delivery span {
  background-color: #FFFAE6;
  color: #FF8A00;
}

.container .wrapper-progress .progress-delivery span {
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

.input-text {
  font-size: 14px;
  width: 200px;
  height: 35px;
  border: 1px solid #cecece;
}

.has-success {
  border: 2px solid #1BD97B;
  border-bottom: 3px solid #1BD97B;
}

.has-error,
.has-error:focus {
  border: 2px solid #FF8A00;
  border-bottom: 4px solid #FF8A00;
}

.float-label {
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 23px;
  transition: 0.2s ease all;
}

input:focus ~ .float-label,
input:not(:focus):valid ~ .float-label,
textarea:focus ~ .float-label,
textarea:not(:focus):valid ~ .float-label{
  top: 8px;
  bottom: 10px;
  left: 15px;
  font-size: 11px;
  opacity: 1;
}

@media (max-width: 768px) {
  .container {
    margin-top: 20px;
    margin-left: 0px;
    padding: 1.5rem;
    padding-top: 0px;
  }
  .container .wrapper-progress {
    margin-left: 0px;
  }
  .wrapper-input,
  .wrapper-input .md-box,
  .wrapper-input .lg-box {
    width: 300px;
  }
}
</style>
