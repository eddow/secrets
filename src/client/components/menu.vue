<template>
	<div class="ui horizontal menu">
		<router-link to="/create" class="item">
			Create
			<i class="pen icon" />
		</router-link>
		<router-link to="/hash" class="item">
			Read
			<i class="eye outline icon" />
		</router-link>
	</div>
</template>
<style>
#example .full.height > .toc {
	position: fixed;
	z-index: 1;
	background-color: #1b1c1d;
	flex: 0 0 auto;
}
</style>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'

@Component
export default class Menu extends Vue {
}
</script>