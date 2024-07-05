<template>
	<div class="app">	
		<PageHeader :isUser='true'></PageHeader>		
		<div class="childView">
			<router-view></router-view>
		</div>		
	</div>
</template>
<script>
	import PageHeader from "../../components/Header.vue";
	export default {
		data() {
			return {
				title:"大数据业务研判中心",
				name: "admin"
			}
		},
		components: {PageHeader},
		activated() {},
		watch: {},
		created() {},
		mounted() {},
		methods: {}
	}
</script>
<style>
	#app {
		background-image: url('../../assets/UserManagement/background.png');
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 0;
		overflow: hidden;
	}
</style>
