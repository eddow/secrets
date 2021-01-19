<template>
	<div class="ui center aligned">
		<h2 class="ui teal header">
			<div class="content">
				Create a secret
			</div>
		</h2>
		<form v-if="!created" class="ui form">
			<div class="field">
				<div class="ui left icon input">
					<i class="pen icon"></i>
					<textarea name="secret" v-model="secret"
						placeholder="Secret content" ref="secret"
					></textarea>
				</div>
			</div>
			<div class="fields">
				<div class="field">
					<label for="expireAfter">Minutes of TTL</label>
					<div class="ui left icon input">
						<i class="clock outline icon"></i>
						<input type="number" name="expireAfter" v-model="expireAfter"
							placeholder="Minutes of TTL">
					</div>
				</div>
				<div class="field">
					<label for="expireAfterViews">Number of allowed views</label>
					<div class="ui left icon input">
						<i class="eye icon"></i>
						<input type="number" name="expireAfterViews" v-model="expireAfterViews"
							placeholder="Number of allowed views">
					</div>
				</div>
			</div>
			<button type="submit" :class="[
					'ui fluid large teal submit button',
					submitting? 'disabled':''
				]">
				Create
			</button>
			<div class="ui error message"></div>
		</form>
		<div v-else>
			<div>
				You can share it by copy/pasting this hash-code : <b>{{created.hash}}</b>
			</div>
			<div>
				Or, this url : <a :href="created.url">{{created.url}}</a>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Secret from '@/business/secret';
import form from '@/lib/form';

@Component
export default class Create extends Vue {
	secret: string = '';
	expireAfterViews: number = 3;
	expireAfter: number = null
	created: any = null
	mounted() {
		form({
			fields: {
				secret: {
					secret: 'secret',
					rules: [{
						type: 'empty',
						prompt: 'Please enter a secret to share at least!'
					}]
				},
				expireAfterViews: {
					identifier: 'expireAfterViews',
					rules: [{
						type: 'empty',
						prompt: 'Please enter the number of allowed views'
					}]
				}
			}
		}, ()=> this.submit());
	  	(<HTMLElement>this.$refs.secret).focus();
	}
	submitting: boolean = false
	async submit() {
		this.submitting = true;
		try {
			let created: any = await Secret.create(this.secret, this.expireAfterViews, this.expireAfter);
			this.created = {
				hash: created.hash,
				url: location.origin + '/read/' + created.hash
			}
		} catch (e) {
			// Error is displayed in the global error catcher
		} finally {
			this.submitting = false;
		}
	}
}
</script>