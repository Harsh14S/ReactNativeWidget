package com.reactnativewidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.util.Log;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class LargeWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

      /*  RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.large_widget);
        Intent intent = new Intent(context, ListWidgetService.class);
        views.setRemoteAdapter(R.id.widgetListView, intent);

        appWidgetManager.updateAppWidget(appWidgetId, views);*/

        /*Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);
        Log.e("TAG", "updateAppWidgetTRY: "  );

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("LARGE_DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("Large_Data", "{\"data\": []}"); // Assuming it's an array
            JSONArray appDataArray = new JSONArray(appString); // Parse as JSONArray
            Log.e("appData", "updateAppWidget11111: " + appDataArray);

            // If you want to access the first object in the array, you can do something like this:
            JSONObject firstObject = appDataArray.getJSONObject(0);
            String symbol = firstObject.getString("Symbol");

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.large_widget);
            views.setOnClickPendingIntent(R.id.widgetListView, pendingIntent);
            views.setTextViewText(R.id.widgetListView, symbol);
            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (JSONException e) {
            e.printStackTrace();
            Log.e("TAG", "updateAppWidgetertgrtghth: " + e.getLocalizedMessage());
        }*/


//        try {
//            SharedPreferences sharedPref = context.getSharedPreferences("LARGE_DATA", Context.MODE_PRIVATE);
//            String appString = sharedPref.getString("Large_Data", "{\"text\":'no data'}");
//            JSONObject appData = new JSONObject(appString);
//            Log.e("appData", "updateAppWidget11111: " + appData);
//            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.large_widget);
//            views.setOnClickPendingIntent(R.id.widgetListView, pendingIntent);
//            views.setTextViewText(R.id.widgetListView, appData.getString("Symbol"));
//            appWidgetManager.updateAppWidget(appWidgetId, views);
//        }catch (JSONException e) {
//            e.printStackTrace();
//            Log.e("TAG", "updateAppWidgetertgrtghth: "+ e.getLocalizedMessage() );
//        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int appWidgetId : appWidgetIds) {
            Intent intent = new Intent(context, ListWidgetService.class);
            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);

            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.large_widget);
            views.setOnClickPendingIntent(R.id.ll_main, pendingIntent);
            views.setRemoteAdapter(R.id.widgetListView, intent);

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}