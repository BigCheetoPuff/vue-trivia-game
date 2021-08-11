<template>
  <component
    :is="tag"
    :class="buttonClasses"
    :type="nativeType"
    v-bind="$attrs"
    @click="$emit('click', $event)"
    :style="borderStyle"
  >
    <span class="v-btn__slot"><slot /></span>
  </component>
</template>

<script>
/**
 * Button Features:
 * - Themes (primary, secondary, etc, light, dark)
 * - Text
 * - Disabled, Loading
 * - Outlined
 * - Block
 * - Sizes
 * - Router Tag implementation (button, a, input, router-link, nuxt-link)
 *
 * To do:
 * - Inverted // @todo Styles for a button that look good when on a background color of the set 'theme' prop
 * - Icons (left and right) // @todo When icons are added, add them here too
 * - Button group? // @todo Add a button group then re-evaluate this component
 *
 * Native Considerations:
 * aria-label - Add an aria-label when button content doesn't describe it, such as when icon-only. Read as "click {label}"
 * aria-role - When not using <button> tag, add aria-role="button" if the element will do something in response to user input (such as when using an a tag to display a modal, rather than to navigate).
 */
const nativeTypes = ['button', 'submit', 'reset'];
const availableSizes = [null, 'tiny', 'small', 'large', 'huge' , 'massive'];
const availableTags = ['button', 'a', 'input', 'router-link', 'nuxt-link', 'n-link', 'NuxtLink', 'NLink'];
const availableThemes = ['white--primary', 'white--secondary', 'black', 'primary', 'secondary'];
const availableRoundedSizes = {

  tiny  : ['5px', '7px', '10px'],
  small : ['7px', '10px', '12px'],
  medium : ['10px', '15px' , '20px'],
  large : ['10px', '15px' , '20px'],
  huge : ['15px', '22px' , '27px'],
  massive : ['25px', '35px' , '50px'],
  pill : '9999px'

}
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    rounded : {type : String , default : 'medium-1'},
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    nativeType: { type: String, default: 'button', validator: (value) => nativeTypes.includes(value) },
    outlined : {type : Boolean , default : false},
    size: { type: String, default: null, validator: (value) => availableSizes.includes(value) },
    tag: { type: String, default: 'button', validator: (value) => availableTags.includes(value) },
    text: { type: Boolean, default: false },
    theme: { type: String, default: 'primary', validator: (value) => availableThemes.includes(value) },
  },
  computed: {

    borderStyle(){

      let borderVal = ""
      if(this.rounded==="pill"){

          borderVal = availableRoundedSizes.pill


      }

      else{

      let dashI = this.rounded.indexOf('-')



        let word = this.rounded.slice(0,dashI)
        let i = parseInt(this.rounded.slice(dashI+1), 10)
        borderVal = availableRoundedSizes[word][i-1]

      }


        return {
          'border-radius' : borderVal
        }


    },
    buttonClasses() {
      return {
        'v-btn': true,
        [`v-btn--${this.theme}`]: this.theme,
        [`v-btn--${this.size}`]: this.size,
        'v-btn--block': this.block,
        'v-btn--disabled': this.disabled,
        'v-btn--loading': this.loading,
        'v-btn--outlined' : this.outlined,
        'v-btn--text': this.text,
      };
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/components/base-button.scss";


</style>
