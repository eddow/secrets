<template>
	<div class="ui middle aligned center aligned grid">
		<div class="column">
			<h2 class="ui teal header">
				<div class="content">
					Create a secret
				</div>
			</h2>
			<form class="ui large form">
				<div class="ui stacked segment">
					<div class="field">
						<div class="ui left icon input">
							<i class="feather icon"></i>
							<textarea name="secret" v-model="secret"
								placeholder="Secret content" ref="secret"
							></textarea>
						</div>
					</div>
					<div class="field">
						<div class="ui left icon input">
							<i class="clock outline icon"></i>
							<input type="number" name="expireAfter" v-model="expireAfter"
								placeholder="Minutes of TTL">
						</div>
					</div>
					<div class="field">
						<div class="ui left icon input">
							<i class="eye icon"></i>
							<input type="number" name="expireAfterViews" v-model="expireAfterViews"
								placeholder="Number of allowed views">
						</div>
					</div>
					<button type="submit" :class="[
							'ui fluid large teal submit button',
							submitting? 'disabled':''
						]">
						Send
					</button>
				</div>
				<div class="ui error message"></div>
			</form>
			<div class="ui message">
				<router-link to="/register">
					Register
				</router-link>
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
	expireAfter: number = 0
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
			await Secret.create(this.secret, this.expireAfterViews, this.expireAfter);
		} catch (e) {
			// Error is displayed in the global error catcher
		} finally {
			this.submitting = false;
		}
	}
}
</script>