package com.reactnativewidget;

import android.content.Context;
import android.widget.RemoteViews;
import android.widget.RemoteViewsService;
import java.util.ArrayList;
import java.util.List;

public class ListRemoteViewsFactory implements RemoteViewsService.RemoteViewsFactory {
    private List<ListModel> data;
    private Context context;

    public ListRemoteViewsFactory(Context applicationContext) {
        this.context = applicationContext;
    }

    @Override
    public void onCreate() {
        data = new ArrayList<>();
        ListModel item1 = new ListModel();
        item1.name = "Hong Kong Exchange";
        //item1.numbers = "00388";
        item1.price = "426.20";
        //.percent = "-2.12";
        data.add(item1);

        ListModel item2 = new ListModel();
        item2.name = "Tencent";
        //item2.numbers = "00700";
        item2.price = "4.29";
        //item2.percent = "+2.09";
        data.add(item2);

        ListModel item3 = new ListModel();
        item3.name = "Apple inc.";
        //item3.numbers = "00700";
        item3.price = "146.70";
        //item3.percent = "+2.09";
        data.add(item3);

        ListModel item4 = new ListModel();
        item4.name = "Futu Holding Limited";
        //item4.numbers = "00700";
        item4.price = "86.70";
        //item4.percent = "+2.09";
        data.add(item4);

        // Add more items as needed
    }

    @Override
    public void onDataSetChanged() {
        // Called when data set changes, update data here if needed.
    }

    @Override
    public RemoteViews getViewAt(int position) {
        // Create a RemoteViews for the item at the specified position
        RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.list_item);

        // Check if the position is valid
        if (position >= 0 && position < data.size()) {
            ListModel item = data.get(position);

            // Set data to the RemoteViews
            remoteViews.setTextViewText(R.id.title, item.name);
            //remoteViews.setTextViewText(R.id.iv_logo, item.logo);
            remoteViews.setTextViewText(R.id.price, item.price);
            //remoteViews.setTextViewText(R.id.iv_graph, item.graph);
        }

        // You can also set click listeners or other actions here.

        return remoteViews;
    }

    @Override
    public RemoteViews getLoadingView() {
        return null;
    }

    @Override
    public int getViewTypeCount() {
        return data.size();
    }

    @Override
    public long getItemId(int i) {
        return data.size();
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    // Implement other required methods like getCount(), getViewTypeCount(), etc.

    @Override
    public void onDestroy() {
        // Cleanup resources if needed.
    }

    @Override
    public int getCount() {
        return data.size();
    }
}
