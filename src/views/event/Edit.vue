<template>
    <p>Edit form here</p>
</template>

<script>
export default {
    props: {
        event: Object,
    },
    data: function() {
    return {
      unsavedChanges: true,
    }
  },
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm("Do you really want to leave? You have unsaved changes!");

      if(!answer) {
        return false;
      }
    }
  }
};
</script>
