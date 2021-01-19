<template>
	<div>
		<h2 class="ui teal header">
			<div class="ui floating content">
				Read a secret
			</div>
		</h2>
		<div class="ui middle aligned center aligned grid" v-if="secret">
			<h3 class="ui header">
				<div class="title content">
					{secret}
				</div>
			</h3>
		</div>
		<form v-else class="ui large form">
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
.ui.table .answer {
	border-top: 0;
}
.ui.grid > div.comments {
	width: 90%;
	padding: 0;
}
</style>
<script lang="ts">
import Vue from 'vue';
import {Component, Inject, Model, Prop, Watch, Emit} from 'vue-property-decorator';
import Secret from '@/business/secret';
import form from '@/lib/form';

@Component
export default class Read extends Vue {
	static params = ['hash'];
	@Prop() hash: string;
	secret: string
	mounted() {
		if(this.hash)
			this.specifyHash();
		else
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
		}, ()=> this.specifyHash());
	}
	async specifyHash() {
		try {
			this.secret = "Loading...";
			await Secret.read(this.hash);
			//TODO: set this.secret from answer
		} catch (e) {
			// Error is displayed in the global error catcher
		}
	}
}
</script>