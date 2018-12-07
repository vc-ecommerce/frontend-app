<template>
  <span>
    <div class="row">
      <Grid :col=6>
        <ChartSaleWeek />
      </Grid><!--.col-->
      <Grid :col=6>
        <div class="row">
          <OrderApproved />
          <OrderCanceled />
          <OrderDone />
          <OrderPending />
        </div><!--.row-->
      </Grid><!--.col-->
    </div><!--.row-->

    <div class="row">
      <Grid :col=12>
        <Birthdays />
      </Grid><!--.col-->
    </div><!--.row-->

    <div class="row">
      <Grid :col=12>
        <OrderRecent />
      </Grid><!--.col-->
      <Grid :col=12>
        <RecentComments />
      </Grid><!--.col-->
      <Grid :col=12>
        <RecentContacts />
      </Grid><!--.col-->
    </div>
  </span>

</template>

<script>

import { customHome } from '@/utils/jquery-helpers'
import Grid from '@/components/layouts/Grid'
import ChartSaleWeek from './components/ChartSaleWeek'
import OrderApproved from './components/OrderApproved'
import OrderCanceled from './components/OrderCanceled'
import OrderDone from './components/OrderDone'
import OrderPending from './components/OrderPending'
import OrderRecent from './components/OrderRecent'
import RecentComments from './components/RecentComments'
import RecentContacts from './components/RecentContacts'
import Birthdays from './components/Birthdays'

export default {
  name: "HomeIndex",
  props: [],
  components: {
    Grid,
    ChartSaleWeek,
    OrderApproved,
    OrderCanceled,
    OrderDone,
    OrderPending,
    OrderRecent,
    RecentComments,
    RecentContacts,
    Birthdays,
  },
  data() {
    return {

    }
  },
  created() {
    customHome();
  },
  mounted() {
    $(() => {
      console.log("mounted jquery home");
    })

  }
};
</script>
