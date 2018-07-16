NEED FROM SAMEEP IN CHART VIEW

time the price was registered
{/* TODO: what does this mean, momentum, how does it map to my value, 'na' */}

      {/* TODO: BID LIST not getting this from server yet */}









CONFLICT (content): Merge conflict in app/mobxStores/Domain/Watchlist.js

=======
      this.deletingRecordId = deletingItem.id;
      this.watchlistData = this.watchlistDataJS.filter(data => data.ticker !== ticker);
      await deleteRequest(`userWatchLists/${deletingItem.id}`);
      await this.getWatchlistData();
      this.deletingRecordId = null;
>>>>>>> master