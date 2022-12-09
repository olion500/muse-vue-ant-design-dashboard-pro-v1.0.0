<!--
	This is the Option page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>

    <a-row type="flex" :gutter="24">

      <!-- Option Column -->
      <a-col :span="24" :md="8" class="mb-24">

        <!-- Products Card -->
        <CardProduct
            :data="optionData"
            title="옵션선택"
            :isAddButtonVisible='false'
            v-on:selected="(item) => selectOptionGroup(item)"
        ></CardProduct>
        <!-- / Products Card -->


      </a-col>
      <!-- / Products Column -->

      <!-- Product Info Column -->
      <a-col :span="24" :md="16">
        <a-row type="flex" :gutter="24">
          <a-col :span="24" class="mb-24">

            <CardOptionTable
                :optionGroup="this.selectedOptionGroup"></CardOptionTable>

          </a-col>
          <a-col :span="24" class="mb-24">

          </a-col>
        </a-row>
      </a-col>
      <!-- / Product Info Column -->



    </a-row>
  </div>
</template>

<script>

import CardProduct from "../../components/Cards/CardProducts"
import CardOptionTable from "../../components/Cards/CardOptionTable"

const optionData = [
  {
    "placeholder": "배경색상 선택",
    "id": 10,
    "name": "배경색상",
    "createdAt": "2022-12-05T12:33:38.124Z",
    "updatedAt": "2022-12-05T12:33:38.124Z",
    "options": [
      {
        "id": 69,
        "name": "흰색",
        "image": "http://3.39.241.52:3000/media/options/f18576ad-fa8e-4977-92ca-bef2acc27151.png",
        "count": 0,
        "createdAt": "2022-12-05T13:21:21.094Z",
        "updatedAt": "2022-12-05T13:21:21.103Z"
      },
      {
        "id": 65,
        "name": "노랑",
        "image": "http://3.39.241.52:3000/media/options/ae2473c1-7189-49b9-92a4-10440a8564fd.png",
        "count": 123,
        "createdAt": "2022-12-05T13:20:39.293Z",
        "updatedAt": "2022-12-06T18:08:33.375Z"
      },
      {
        "id": 67,
        "name": "빨강",
        "image": "http://3.39.241.52:3000/media/options/d3e14bc7-6bc3-402f-9cb1-9fe950635fc9.png",
        "count": 23,
        "createdAt": "2022-12-05T13:20:59.347Z",
        "updatedAt": "2022-12-08T04:32:40.572Z"
      },
      {
        "id": 68,
        "name": "파랑",
        "image": "http://3.39.241.52:3000/media/options/6f9612eb-4d3b-4bb6-9c4d-a79a34ebc493.png",
        "count": 23,
        "createdAt": "2022-12-05T13:21:11.950Z",
        "updatedAt": "2022-12-08T04:32:42.913Z"
      },
      {
        "id": 66,
        "name": "보라",
        "image": "http://3.39.241.52:3000/media/options/d0fccedc-c1db-4f26-a60f-0ed77524ab6d.png",
        "count": 4334,
        "createdAt": "2022-12-05T13:20:49.729Z",
        "updatedAt": "2022-12-08T04:32:46.568Z"
      }
    ]
  },
  {
    "placeholder": "팬던트 선택",
    "id": 11,
    "name": "팬던트",
    "createdAt": "2022-12-05T12:33:49.482Z",
    "updatedAt": "2022-12-05T12:33:49.482Z",
    "options": [
      {
        "id": 75,
        "name": "둥근하트-골드 S",
        "image": "http://3.39.241.52:3000/media/options/0df9202a-3457-48ab-b8f5-da9c8341a360.png",
        "count": 123,
        "createdAt": "2022-12-05T16:06:04.123Z",
        "updatedAt": "2022-12-06T17:55:23.432Z"
      },
      {
        "id": 77,
        "name": "서지컬원-골드-S",
        "image": "http://3.39.241.52:3000/media/options/96d32091-363d-4674-a672-c7d4e9fe0c84.png",
        "count": 123,
        "createdAt": "2022-12-05T16:06:33.441Z",
        "updatedAt": "2022-12-06T17:56:11.447Z"
      },
      {
        "id": 76,
        "name": "둥근하트-실버 S",
        "image": "http://3.39.241.52:3000/media/options/8168ebac-4854-4f8e-b179-695a3b35d421.png",
        "count": 0,
        "createdAt": "2022-12-05T16:06:20.057Z",
        "updatedAt": "2022-12-05T16:06:20.070Z"
      },
      {
        "id": 78,
        "name": "서지컬원-실버-M",
        "image": "http://3.39.241.52:3000/media/options/63bc074a-4b4f-4222-866b-fd6f62784920.png",
        "count": 19,
        "createdAt": "2022-12-05T16:06:48.906Z",
        "updatedAt": "2022-12-06T17:29:05.177Z"
      },
      {
        "id": 79,
        "name": "강아지-1",
        "image": "http://3.39.241.52:3000/media/options/8934ec6c-fb49-4bc0-a711-9d09b4f2fc82.png",
        "count": 1,
        "createdAt": "2022-12-05T16:07:01.930Z",
        "updatedAt": "2022-12-06T18:09:38.876Z"
      }
    ]
  },
  {
    "placeholder": "글씨체 선택",
    "id": 8,
    "name": "글씨체",
    "createdAt": "2022-12-05T12:32:18.505Z",
    "updatedAt": "2022-12-05T12:32:18.505Z",
    "options": [
      {
        "id": 35,
        "name": "야놀자체",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.516Z",
        "updatedAt": "2022-12-05T12:32:18.543Z"
      },
      {
        "id": 37,
        "name": "도현체",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.520Z",
        "updatedAt": "2022-12-05T12:32:18.543Z"
      },
      {
        "id": 39,
        "name": "주아체",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.524Z",
        "updatedAt": "2022-12-05T12:32:18.543Z"
      },
      {
        "id": 41,
        "name": "손글씨체",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.530Z",
        "updatedAt": "2022-12-05T12:32:18.543Z"
      }
    ]
  },
  {
    "placeholder": "강아지얼굴 선택",
    "id": 9,
    "name": "강아지얼굴",
    "createdAt": "2022-12-05T12:33:28.069Z",
    "updatedAt": "2022-12-05T12:33:28.069Z",
    "options": [
      {
        "id": 80,
        "name": "리트리버",
        "image": "http://3.39.241.52:3000/media/options/963f8c1f-c70f-4cb5-9c7d-f0a523063832.png",
        "count": 0,
        "createdAt": "2022-12-06T13:40:55.198Z",
        "updatedAt": "2022-12-06T13:40:55.213Z"
      },
      {
        "id": 81,
        "name": "푸들",
        "image": "http://3.39.241.52:3000/media/options/9ff6b766-c797-4d6b-a3ca-e9eb976278dc.png",
        "count": 0,
        "createdAt": "2022-12-06T13:41:33.150Z",
        "updatedAt": "2022-12-06T13:41:33.160Z"
      },
      {
        "id": 82,
        "name": "비숑",
        "image": "http://3.39.241.52:3000/media/options/cb606ccd-b091-4599-82b8-2c191823678b.png",
        "count": 0,
        "createdAt": "2022-12-06T13:41:41.618Z",
        "updatedAt": "2022-12-06T13:41:41.627Z"
      },
      {
        "id": 83,
        "name": "아이쥐",
        "image": "http://3.39.241.52:3000/media/options/03bdccf2-76a1-47f5-b9e0-8f6a6ac2c5ea.png",
        "count": 0,
        "createdAt": "2022-12-06T13:41:54.300Z",
        "updatedAt": "2022-12-06T13:41:54.310Z"
      },
      {
        "id": 84,
        "name": "바둑이",
        "image": "http://3.39.241.52:3000/media/options/57a77dca-09eb-4b46-b2c5-ff1b757c3a1c.png",
        "count": 0,
        "createdAt": "2022-12-06T13:42:02.520Z",
        "updatedAt": "2022-12-06T13:42:02.530Z"
      }
    ]
  },
  {
    "placeholder": "글자색상 선택",
    "id": 7,
    "name": "글자색상",
    "createdAt": "2022-12-05T12:32:18.496Z",
    "updatedAt": "2022-12-05T12:32:18.496Z",
    "options": [
      {
        "id": 33,
        "name": "흰색",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.511Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 34,
        "name": "빨강",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.514Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 36,
        "name": "분홍",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.518Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 38,
        "name": "살구",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.522Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 40,
        "name": "파랑",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.528Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 42,
        "name": "검정",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.532Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 43,
        "name": "보라",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.539Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      },
      {
        "id": 44,
        "name": "하늘",
        "image": null,
        "count": 0,
        "createdAt": "2022-12-05T12:32:18.544Z",
        "updatedAt": "2022-12-05T12:32:18.554Z"
      }
    ]
  },
  {
    "placeholder": "스트랩 선택",
    "id": 12,
    "name": "스트랩",
    "createdAt": "2022-12-05T12:33:53.449Z",
    "updatedAt": "2022-12-05T12:33:53.449Z",
    "options": [
      {
        "id": 64,
        "name": "ALL 하늘",
        "image": "http://3.39.241.52:3000/media/options/e4194596-b886-4fa3-b519-0042fc277962.png",
        "count": 0,
        "createdAt": "2022-12-05T12:41:48.287Z",
        "updatedAt": "2022-12-05T12:41:48.299Z"
      },
      {
        "id": 61,
        "name": "하늘+보라",
        "image": "http://3.39.241.52:3000/media/options/2330afa7-b8c4-4808-a791-3a6e39e5b139.png",
        "count": 0,
        "createdAt": "2022-12-05T12:41:08.671Z",
        "updatedAt": "2022-12-05T12:41:08.680Z"
      },
      {
        "id": 63,
        "name": "주황+노랑",
        "image": "http://3.39.241.52:3000/media/options/15ca7e8c-790d-4eb1-80ea-69cddc10a42f.png",
        "count": 0,
        "createdAt": "2022-12-05T12:41:34.193Z",
        "updatedAt": "2022-12-05T12:41:34.219Z"
      },
      {
        "id": 62,
        "name": "빨강+하늘",
        "image": "http://3.39.241.52:3000/media/options/7e80ef79-5584-411c-a3ed-9322655d54d3.png",
        "count": 0,
        "createdAt": "2022-12-05T12:41:21.386Z",
        "updatedAt": "2022-12-05T12:41:21.394Z"
      },
      {
        "id": 60,
        "name": "하늘+분홍",
        "image": "http://3.39.241.52:3000/media/options/9b2d2243-1100-451e-a53b-64768aaf7494.png",
        "count": 0,
        "createdAt": "2022-12-05T12:40:58.679Z",
        "updatedAt": "2022-12-05T12:40:58.688Z"
      }
    ]
  }
];

let selectedOptionGroup = {
  id: 0,
  name: '',
  options: [],
};

export default ({
  components: {
    CardProduct,
    CardOptionTable,
  },
  data() {
    return {
      optionData,
      selectedOptionGroup
    }
  },
  methods: {
    selectOptionGroup(item) {
      this.selectedOptionGroup = item;
    }
  }
})

</script>

<style lang="scss">
</style>
