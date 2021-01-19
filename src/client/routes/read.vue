<template>
	<div>
		<h2 class="ui teal header">
			<div class="ui floating content">
				Read a secret
			</div>
		</h2>
		<div v-if="secret">
			<h3 class="ui header">
				<div class="title content">
					{{secret.secretText}}
				</div>
			</h3>
			<div>
				Remaing views: {{secret.remainingViews}}
			</div>
		</div>
		<div v-else class="title content">
			Loading...
		</div>
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
export default class Read extends Vue {
	static params = ['hash'];
	@Prop() hash: string;
	@Inject() router: VueRouter;
	secret: any = null
	mounted() {
		this.specifyHash();
	}
	async specifyHash() {
		try {
			this.secret = await Secret.read(this.hash);
			//TODO: set this.secret from answer
		} catch (e) {
			this.router.push('/hash')
			// Error is displayed in the global error catcher
		}
	}
}
</script>