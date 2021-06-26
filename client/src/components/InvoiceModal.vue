<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap">
    <form class="invoice-content" @submit.prevent="submitForm">
      <h1>New Invoice</h1>

      <!-- Bill from -->
      <div class="bill-from">
        <h4>Bill From</h4>
        <div class="input">
          <label for="billerStreetAddress">Street Address</label>
          <input type="text" id="billerStreetAddress" v-model="billerStreetAddress" />
        </div>

        <div class="location-details">
          <div class="input">
            <label for="billerCity">City</label>
            <input type="text" id="billerCity" v-model="billerCity" />
          </div>
          <div class="input">
            <label for="billerZipCode">Zip Code</label>
            <input type="text" id="billerZipCode" v-model="billerZipCode" />
          </div>
          <div class="input">
            <label for="billerCountry">Country</label>
            <input type="text" id="billerCountry" v-model="billerCountry" />
          </div>
        </div>
      </div>

      <!-- Bill To -->
      <div class="bill-to">
        <h4>Bill To</h4>
        <div class="input">
          <label for="clientName">Client's Name</label>
          <input type="text" id="clientName" v-model="clientName" />
        </div>
        <div class="input">
          <label for="clientEmail">Client's Email</label>
          <input type="text" id="clientEmail" v-model="clientEmail" />
        </div>
        <div class="input">
          <label for="clientStreetAddress">Street Address</label>
          <input type="text" id="clientStreetAddress" v-model="clientStreetAddress" />
        </div>

        <div class="location-details">
          <div class="input">
            <label for="clientCity">City</label>
            <input type="text" id="clientCity" v-model="clientCity" />
          </div>
          <div class="input">
            <label for="clientZipCode">Zip Code</label>
            <input type="text" id="clientZipCode" v-model="clientZipCode" />
          </div>
          <div class="input">
            <label for="clientCountry">Country</label>
            <input type="text" id="clientCountry" v-model="clientCountry" />
          </div>
        </div>
      </div>

      <!-- Invoice work details -->
      <div class="invoice-work">
        <div class="payment">
          <div class="input">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceDate" />
          </div>
          <div class="input">
            <label for="paymentDueDate">Payment Due</label>
            <input disabled type="text" id="paymentDueDate" v-model="paymentDueDate" />
          </div>
        </div>

        <div class="input">
          <label for="paymentTerms">Payment Terms</label>
          <select id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 days</option>
            <option value="60">Net 60 days</option>
          </select>
        </div>
        <div class="input">
          <label for="productDescription">Product Description</label>
          <input type="text" id="productDescription" v-model="productDescription" />
        </div>

        <div class="work-items">
          <h3>Item List</h3>
          <table class="items-list-table">
            <tr class="table-head-row">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr class="table-items" v-for="(item, index) in invoiceItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName" /></td>
              <td class="qty"><input type="text" v-model="item.qty" /></td>
              <td class="price"><input type="text" v-model="item.price" /></td>
              <td class="total">${{ (item.total = item.qty * item.price) }}</td>
              <font-icon @click="deleteInvoiceItem(item.id)" icon="minus-circle" />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="button">
            <font-icon icon="plus-circle" />
            Add New Item
          </div>
        </div>
      </div>

      <div class="save">
        <div class="left">
          <button type="button" @click="closeInvoice" class="red">Cancel</button>
        </div>
        <div class="right">
          <button @click="saveDraft" class="dark-purple">
            Save Draft
          </button>
          <button @click="publishInvoice" class="purple">
            Create Invoice
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export default {
  name: 'InvoiceModal',
  data() {
    return {
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    };
  },
  created() {
    // get current date for invoice date field
    this.invoiceDateUnix = Date.now();
    this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },
  methods: {
    ...mapMutations('invoice', ['toggleInvoice']),

    closeInvoice() {
      this.toggleInvoice();
    },
    saveDraft() {
      this.invoiceDraft = true;
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        // eslint-disable-next-line
        alert('Please ensure you filled out work items');
      }
      this.calcInvoiceTotal();

      const res = await axios.post(
        'http://localhost:3000/api/invoices/new',
        {
          invoiceId: uuid(6),
          billerStreetAddress: this.billerStreetAddress,
          billerCity: this.billerCity,
          billerZipCode: this.billerZipCode,
          billerCountry: this.billerCountry,
          clientName: this.clientName,
          clientEmail: this.clientEmail,
          clientStreetAddress: this.clientStreetAddress,
          clientCity: this.clientCity,
          clientZipCode: this.clientZipCode,
          clientCountry: this.clientCountry,
          invoiceDate: this.invoiceDate,
          invoiceDateUnix: this.invoiceDateUnix,
          paymentTerms: this.paymentTerms,
          paymentDueDate: this.paymentDueDate,
          paymentDueDateUnix: this.paymentDueDateUnix,
          productDescription: this.productDescription,
          invoiceItemList: this.invoiceItemList,
          invoiceTotal: this.invoiceTotal,
          invoicePending: this.invoicePending,
          invoiceDraft: this.invoiceDraft,
          // invoicePaid: null,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('vtk')}`,
          },
        },
      );
      console.log(res);
      console.log(uuid(6));
    },
    submitForm() {
      this.uploadInvoice();
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uuid(),
        itemName: '',
        qty: '',
        price: 0,
        total: 0,
      });
    },
    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter((item) => item.id !== id);
    },
    calcInvoiceTotal() {
      this.invoiceTotal = this.invoiceItemList.reduce((prev, curr) => prev + curr.total, 0);
    },
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(
        futureDate.getDate() + Number(this.paymentTerms),
      );
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.invoice-wrap {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 90px;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: auto;
  z-index: 80;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (min-width: 900px) {
    left: 90px;
    top: 0;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    widows: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-bottom: 48px;
      color: #fff;
    }

    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }

    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }
  }

  /* Bill From / Bill To */

  .bill-from,
  .bill-to {
    display: flex;
    flex-direction: column;
    margin-bottom: 48px;

    .location-details {
      display: flex;
      gap: 16px;
      div {
        flex: 1;
      }
    }
  }

  .invoice-work {
    display: flex;
    flex-direction: column;

    .payment {
      display: flex;
      gap: 24px;
      div {
        flex: 1;
      }
    }

    .work-items {
      .items-list-table {
        width: 100%;

        /* Item table styling */

        .table-head-row,
        .table-items {
          display: flex;
          gap: 16px;
          font-size: 12px;

          .item-name {
            flex-basis: 50%;
          }

          .qty {
            flex-basis: 10%;
          }
          .price {
            flex-basis: 20%;
          }
          .total {
            flex-basis: 20%;
            align-self: center;
          }
        }

        .table-head-row {
          margin-bottom: 16px;

          th {
            text-align: left;
          }
        }

        .table-items {
          display: flex;
          position: relative;
          margin-bottom: 24px;

          svg {
            position: absolute;
            top: 15px;
            right: 0;
            width: 12px;
            height: 16px;
          }
        }
      }
      .button {
        display: flex;
        color: #fff;
        background-color: #252945;
        align-items: center;
        justify-content: center;
        width: 100%;

        svg {
          margin-right: 4px;
        }
      }
    }
  }

  .save {
    display: flex;
    margin-top: 40px;
    div {
      flex: 1;
    }

    .right {
      display: flex;
      justify-content: flex-end;
    }
  }

  .dark-purple {
    background-color: #252945;
  }
  .red {
    background-color: #ec5757;
  }
  .purple {
    background-color: #7c5dfa;
  }
}
</style>
