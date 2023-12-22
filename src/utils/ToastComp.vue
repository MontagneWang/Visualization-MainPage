<script lang="ts" setup>
const props = defineProps({
	show: Boolean
})
</script>

<template>
	<Transition name="modal" @click="$emit('close')">
		<div v-if="show" class="modal-mask">
			<div class="modal-container">

				<div class="modal-header">
					<slot name="header">Toast default body</slot>
				</div>

				<div class="modal-body">
					<slot name="body">Toast default body</slot>
				</div>

				<div class="modal-footer">
					<slot name="footer">

					</slot>
				</div>

			</div>
		</div>
	</Transition>
</template>
<style>
* {
  font-family: LXGW WenKai Lite, serif !important;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
  font-size: 1.3vw;
}

.modal-container {
  margin: auto;
  padding: 2vw 2.3vw 0.5vw;
  background-color: #fff;
  border-radius: 0.6vw;
  box-shadow: 0 0.2vw 0.8vw rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 2vw 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
