<template>
	<div id="app" ref="main">
		<main-menu class="toc"/>
		<router-view class="content" />
	</div>
</template>
<style lang="scss">
.body {
	overflow: hidden;
}
#app {
	background-color: #dadada;
    height: 100vh;
}

.content {
    flex: 1 1 auto;
    min-width: 0px;
    margin-left: 15rem;
	height: 100%;
}
</style>
<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator'
import mainMenu from './menu.vue'
import {globals} from '@/lib/ajax'

@Component({
	components: {mainMenu}
})
export default class App extends Vue {
	constructor(...args: any[]) {
		super(...args);
		globals.failure = (err: any)=> {
			(<any>$(this.$refs.main)).toast({
				class: 'error',
				title: err.statusText,
				message: err.responseText
			});
		}
	}
}
</script>