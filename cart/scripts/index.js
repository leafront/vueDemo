
	Vue.component('Loading', {
		props: ['isLoading'],
		template:`
			<div class="loadingToast" v-show="isLoading">
				<div class="weui-mask_transparent"></div>
				<div class="weui-toast">
					<i class="weui-loading weui-icon_toast"></i>
					<p class="weui-toast__content">正在加载中</p>
				</div>
			</div>`
	})

  var vm = new Vue({
    el:"#app",
    data:{
      selectedItem: {},
      numItem:[],
			isLoading: true,
      list:[]
    },
		created() {
			fetch('/cart/list' , {
	       method: 'POST',
	       headers: {
	         'Content-Type':'application/json'
	       }
	     })
	     .then((response) => {
	       if (response.ok) {
	           return response.json();
	       }
	     }).then((json) => {

	       if (json) {

					 this.list = json;

					 this.isLoading = false;

					 this.setSelecctItem(json);

	       }
	     }).catch((error) => {

	       console.error(error);

	     })
		},
    computed: {

      isSelectAll() {

        const selectedItem = this.selectedItem;

        const isSelect = this.list.every(({
          id
        }) =>{

          return selectedItem[id];

        })

        return isSelect;

      },

      //计算总价
      totalPrice (){

        let total = 0;

        const selectedItem = this.selectedItem;

        const numItem = this.numItem;

        this.list.forEach(({
          id,
          price

        },index) => {

          if (selectedItem[id]) {

            total += price * numItem[index];

          }
        })

        return total;
      }
    },
    methods: {
			//开始设置默认状态
			setSelecctItem(list) {

				let selectedItem = {};

				let numItem = [];

				list.forEach(({
          id
        }) => {

					selectedItem[id] = false;

					numItem.push(1);

				})

				this.numItem = numItem;

				this.selectedItem = selectedItem;

			},

      //选择商品
      selectGood (id){

        let selectItem = this.selectedItem;

        if (selectItem[id]) {

           selectItem[id] = false;

        } else {

           selectItem[id] = true;
        }

      },
      //全选
      selectAll (){

        const list = this.list;

        let selectedItem = this.selectedItem;

        list.forEach(({
          id
        }) => {

          selectedItem[id] = true;

        })

      },
      //单个数量增加或者减少
      changeNum (index,val) {

        let numItem = this.numItem;

        let currentNum = numItem[index];

        if (currentNum == 1 &&  val == -1) {

          return;

        } else {

           this.numItem.splice(index,1, currentNum + val);

        }

      },

      //取消全选
      unSelectAll (){

        const list = this.list;

        let selectedItem = this.selectedItem;

        list.forEach(({
          id
        }) => {

          selectedItem[id] = false;

        })

      },
      //单个删除
      delGood(index){

        this.list.splice(index,1);

        this.numItem.splice(index,1);

      },

      //多个选择删除
      deleteSelectedGoods() {

        const list = this.list;

        const selectedItem = this.selectedItem;

        const numItem = this.numItem;

				const isSelectGood = list.some(({
          id
        }) => {

					return selectedItem[id] == true;

				})

				if (!isSelectGood) {

					alert('至少选择一个');

					return;

				}

        for (let len = list.length, i = len -1; i >= 0; i--) {

          if (selectedItem[list[i].id]) {

            list.splice(i,1);

            numItem.splice(i,1);
          }
        }
      }
    }
  })
