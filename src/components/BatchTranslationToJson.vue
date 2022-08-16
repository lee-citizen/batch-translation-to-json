<template>
  <h1 text-center pt-30px>
    {{ titleName }}
  </h1>
  <div></div>
  <div flex justify-center space-x-4>
    <a-radio-group v-model:value="searchType" @change="searchChange" button-style="solid">
      <a-radio-button value="baidu">百度</a-radio-button>
      <a-radio-button value="youdao">有道</a-radio-button>
    </a-radio-group>
    <a-select v-model:value="lang" w-120px @change="langChange">
      <a-select-option v-for="(item,index) in langList" :value="searchType == 'baidu' ? item.baidu : item.youdao" :key="index">{{item.name}}</a-select-option>
    </a-select>
  </div>

  <div flex-col md:flex-row flex mt-5 container mx-auto>
    <div flex-1 md:mr-10>
      <a-card title="要翻译的文字" flex-1>
        <template #extra>
          <a href="#">{{ state.lastText }}</a>
        </template>
        <a-textarea allowClear class="!min-h-82px" v-model:value="state.text" :placeholder="inputPlaceholder" @change="textareaChange" />
      </a-card>
      <a-button mx-6 md:mx-0 my5 @click="onSearch" type="primary" :loading="loading">查询</a-button>
    </div>

    <div flex-1>
      <a-card title="翻译结果">
        <template #extra>
          <a href="#">{{ state.lastText }}</a>
        </template>
        <json-viewer :value="kwObj" closed="true" show-double-quotes copyable :preview-mode="false"></json-viewer>
      </a-card>
      <div flex justify-center md:justify-start space-x-4>
        <a-button
          my5
          type="primary"
          :disabled="!jsonData || btnTypeIndex == index"
          v-for="(item,index) in btnType"
          :key="index"
          @click="taggleGenetator(item.val,index)"
        >{{item.name}}</a-button>
      </div>
    </div>
  </div>
  <Footer></Footer>
</template>

<script setup>
import pinyin from 'js-pinyin'
// json格式化显示
import Footer from './Footer.vue'
import JsonViewer from 'vue-json-viewer'
import { DownloadOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import { ref, reactive, h, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { initState, optionState } from '../config'
import getResultObj from '../util/getResultObj'
import getParam from '../util/bd'
import getYDParam from '../util/request'
// 定义props
const props = defineProps({
  titleName: String
})

const langList = [
  {
    name: '英语',
    baidu: 'en',
    youdao: 'en'
  },
  {
    name: '中文',
    baidu: 'zh',
    youdao: 'zh'
  },
  {
    name: '日语',
    baidu: 'jp',
    youdao: 'ja'
  },
  {
    name: '韩语',
    baidu: 'kor',
    youdao: 'ko'
  },
  {
    name: '西班牙语',
    baidu: 'spa',
    youdao: 'es'
  },
  {
    name: '中文(繁体)',
    baidu: 'cht',
    youdao: 'zh-CHT'
  },
  // {
  //   name:'中文(文言文)',
  //   baidu:"wyw",
  //   youdao:""
  // },
  {
    name: '俄语',
    baidu: 'ara',
    youdao: 'ru'
  },
  {
    name: '越南语',
    baidu: 'vie',
    youdao: 'vi'
  },
  {
    name: '法语',
    baidu: 'fra',
    youdao: 'fr'
  },
  {
    name: '德语',
    baidu: 'de',
    youdao: 'de'
  }
]
const lang = ref('en')

const jsonData = ref('')
const searchType = ref('baidu')

const searchChange = e => {
  lang.value = 'en'
}
const langChange = e => {}
const textareaChange = e => {
  if (!state.text) {
    jsonData.value = ''

    Object.keys(kwObj).map(key => {
      delete kwObj[key]
    })
  }
}

// 初始化state
const state = reactive(initState)
const options = reactive(optionState)
const inputPlaceholder = ref('请输入内容,每条内容按回车换行,再点击查询按钮')
//获取焦点
const info = () => {
  Modal.info({
    title: 'BY:作者',
    okText: '关闭',
    content: h('div', {}, [h('p', '如果此工具有帮助到你，请帮忙点个star。'), h('p', '若希望给本工具一些建议，可以提issue。')]),
    onOk() {}
  })
}

const loading = ref(false)
onMounted(info)

let kwObj = reactive({})

const onSearch = () => {
  let kw = state.text.split(/[\r\n\t]/) || []
  let i = 0
  let pin = ''
  let timer = setInterval(() => {
    let length = kw.length
    pin = pinyin.getFullChars(kw[i])
    if (lang.value == 'zh') {
      kwObj[pin] = kw[i]
    }else{
      kwObj[pin] = ''
      queryByJs(pin, kw[i])
    }
    i++
    if (i >= length) {
      clearInterval(timer)
    }
  }, lang.value == 'zh' ? 0 :1500)
}

const btnTypeIndex = ref(0)

const btnType = [
  {
    name: '大驼峰',
    val: 'bigHumpNaming'
  },
  {
    name: '小驼峰',
    val: 'smallHumpNaming'
  },
  {
    name: '下划线',
    val: 'underlineNaming'
  },
  {
    name: '常量',
    val: 'constant'
  }
]

const taggleGenetator = (type, index) => {
  btnTypeIndex.value = index
  Object.assign(kwObj, { ...getResultObj(kwObj, type) })
}

//  通过JS查询
const queryByJs = async (pin, text) => {
  loading.value = true
  //中文判断
  if (/^[\u4e00-\u9fa5]+$/i.test(text)) {
    let data = getParam(text, lang.value)
    let dataYd = getYDParam(text, lang.value)

    if (searchType.value == 'baidu') {
      // 百度结果
      let resultArrayBaidu = await apiPost('https://api.fanyi.baidu.com/api/trans/vip/translate', data, 'post', pin)
    } else {
      //有道结果
      let resultArray = await apiPost('https://openapi.youdao.com/api', dataYd, 'post', pin)
    }
    loading.value = false

    jsonData.value = JSON.stringify(kwObj)
    inputPlaceholder.value = '请输入内容,再点击确定或者回车'
  } else {
    message.error('请输入纯中文!')
    loading.value = false
  }
}
// 请求方法 retrun Promise<Aarry>
const apiPost = (url, data, type, pin) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: type,
      dataType: 'jsonp',
      data: data,
      success: function (data) {
        let translateArray = data.trans_result ? data.trans_result[0].dst : data.translation[0]

        kwObj[pin] = translateArray
        resolve(kwObj)
      }
    })
  })
}
</script>

