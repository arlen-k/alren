<template>
    <button :class="classResult" :style="{width:size+'px'}">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        data(){

        },
        props:['type','isLink','size'],
        methods:{

        },
        computed:{
            classResult(){
                let classSet = new Set(['btn',this.type])

                if(this.isLink){
                    classSet.add('btn_link')
                }

                return classSet
            }
        }
    }
</script>
