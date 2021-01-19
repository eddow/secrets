<template>
	<div>
		<h2 class="ui teal header">
			<div class="ui floating content">
				Read a secret
			</div>
		</h2>
		<form class="ui large form">
			<div class="ui stacked segment">
				<div class="field">
					<div class="ui left icon input">
						<i class="hashtag icon"></i>
						<input type="string" name="hash" v-model="hash" placeholder="Given hash">
					</div>
				</div>
				<button type="submit" class="ui fluid large teal submit button">
					Read...
				</button>
			</div>
			<div class="ui error message"></div>
		</form>
	</div>
</template>
<style>
</style>
<script lang="ts">
import Vue from 'vue';
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator';
import Secret from '@/business/secret';
import form from '@/lib/form';
import VueRouter from 'vue-router'

@Component
export default class Hash extends Vue {
	hash: string = '';
	@Inject() router: VueRouter;
	mounted() {
		this.initComponents();
	}
	initComponents() {
		form({
			fields: {
				hash: {
					identifier: 'hash',
					rules: [{
						type: 'empty',
						prompt: 'Please enter the desired hash'
					}]
				}
			}
		}, ()=> this.router.push({name: 'read', params: {hash: this.hash}}));
	}
}
</script>