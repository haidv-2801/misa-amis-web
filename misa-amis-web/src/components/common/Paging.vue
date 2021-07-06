<template>
  <div id="pagination" class="main__pagination">
    <div class="pagi__left">
      <span class="total-page">
        Tổng số: <b>1043</b> bản ghi
      </span>
    </div>
    <div class="pagi__right">
      <div class="page-size"></div>
      <div class="page-number">
        Trước 1 2 3 ... 11 Sau
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.pagination = JSON.parse(JSON.stringify(this.data));
  },
  data() {
    return {
      //clone model to new one
      pagination: JSON.parse(JSON.stringify(this.data)),

      //to calculate page segment
      pageStep: 0,
    };
  },
  methods: {
    /**
     * Select page number
     * DVHAI 13/06/2021
     */
    increPagesize() {
      if (this.pagination.pageSize < this.pagination.totalRecord) {
        this.pagination.pageSize++;
        this.pageStep = 0;
        this.pagination.pageNumber = 1;
      }
    },

    /**
     * Select page number
     * DVHAI 13/06/2021
     */
    descPagesize() {
      if (this.pagination.pageSize > 1) {
        this.pagination.pageSize--;
        this.pageStep = 0;
        this.pagination.pageNumber = 1;
      }
    },

    /**
     * Select page number
     * DVHAI 13/06/2021
     */
    btnClick(index) {
      this.pagination.pageNumber = index;
    },

    /**
     * Select previus page
     * DVHAI 13/06/2021
     */
    prePage() {
      if (this.pagination.pageNumber > 1) {
        if (this.pagination.pageNumber == this.lowerBoundPage) {
          this.pageStep--;
        }
        this.pagination.pageNumber--;
      }
    },

    /**
     * Select first page
     * DVHAI 13/06/2021
     */
    firstPage() {
      this.pageStep = 0;
      this.pagination.pageNumber = 1;
    },

    /**
     * Select last page
     * DVHAI 13/06/2021
     */
    lastPage() {
      this.pageStep = this.pagination.totalPage - this.pagination.maximumPage;
      this.pagination.pageNumber = this.pagination.totalPage;
    },

    /**
     * Select page number
     * DVHAI 13/06/2021
     */
    nextPage() {
      if (this.pagination.pageNumber < this.pagination.totalPage) {
        if (this.pagination.pageNumber == this.upperBoundPage) {
          this.pageStep++;
        }
        this.pagination.pageNumber++;
      }
    },
  },
  computed: {
    //page segment
    fromNumber() {
      let from =
        this.pagination.pageSize * (this.pagination.pageNumber - 1) + 1;
      return from.toString().padStart(2, "0");
    },

    toNumber() {
      let to = this.pagination.pageSize * this.pagination.pageNumber;
      return to.toString().padStart(2, "0");
    },

    //list page number
    listPages() {
      let lPage = [];
      for (let i = this.lowerBoundPage; i <= this.upperBoundPage; i++) {
        lPage.push(i);
      }
      return lPage;
    },

    //currentPageNumber
    currentPageNumber() {
      return this.pagination.pageNumber;
    },

    //currentPageSize
    currentPageSize() {
      return this.pagination.pageSize;
    },

    //lowerBoundPage
    lowerBoundPage() {
      return Math.max(1, 1 + this.pageStep);
    },

    //upperBoundPage
    upperBoundPage() {
      return Math.min(
        this.pagination.maximumPage + this.pageStep,
        this.pagination.totalPage
      );
    },
  },
  watch: {
    //tracking current pagenumber
    currentPageNumber: function(value) {
      this.$emit("changePageNumber", value);
    },

    //tracking current pagesize
    currentPageSize: function(value) {
      this.$emit("changePageSize", value);
    },

    //tracking props data and clone to a new one
    data: {
      deep: true,
      handler: function() {
        this.pagination = JSON.parse(JSON.stringify(this.data));
      },
    },
  },
};
</script>

<style scoped>
.main__pagination {
  padding-right: 75px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagi__left {
}

.total-page {
}

.pagi__right {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-size {
}

.page-number {
}
</style>
