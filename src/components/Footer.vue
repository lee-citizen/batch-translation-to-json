<template>
    <div w-full>
        <div flex justify-center>
            <a-button type="link">© {{ YEAR + ' ' + domain}}</a-button>
        </div>
        <div flex justify-center items-center>
            <a-button target="_blank" type="link" href="http://www.wdxdd.top">个人博客</a-button>|  
            <a-button target="_blank" type="link" href="https://gitee.com/L1q/batch-translation-to-json">GitHub</a-button>|
            <a-button target="_blank" type="link" href="https://github.com/lee-citizen/batch-translation-to-json">Gitee</a-button>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, h, onMounted } from 'vue'
const domain = ref('')
const YEAR = new Date().getFullYear()
const info = () => {
    domain.value = document.domain
}
onMounted(info)

</script>