package com.reactnativewidget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.util.Log;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class StreakWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager,
                                int appWidgetId) {

        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
            JSONObject appData = new JSONObject(appString);
            Log.e("TAG", "updateAppWidget: " + appData );
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.streak_widget);
            views.setOnClickPendingIntent(R.id.ll_main, pendingIntent);
            views.setTextViewText(R.id.app_widget_text, appData.getString("Symbol"));
            views.setTextViewText(R.id.price, appData.getString("Bid"));
            if (appData.getBoolean("lev")) {
                views.setTextViewText(R.id.percentage,  "+ " + appData.getString("Perc")+ "%");
                views.setTextColor(R.id.percentage, Color.parseColor("#00C35D"));
                views.setInt(R.id.percentage, "setBackgroundResource", R.drawable.text_bg);
                views.setInt(R.id.graphImage, "setBackgroundResource", R.drawable.graph);
            } else {
                views.setTextViewText(R.id.percentage,  "- " + appData.getString("Perc") + "%");
                views.setTextColor(R.id.percentage, Color.parseColor("#D81515"));
                views.setInt(R.id.percentage, "setBackgroundResource", R.drawable.text_bg_red);
                views.setInt(R.id.graphImage, "setBackgroundResource", R.drawable.graph_negative);
            }
            appWidgetManager.updateAppWidget(appWidgetId, views);
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
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