"use client";

import { useEffect, useState } from "react";
import {
  PersonalizedContentRecommendationsOutput,
  personalizedContentRecommendations,
} from "@/ai/flows/personalized-content-recommendations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BotMessageSquare, ThumbsUp } from "lucide-react";

export function Recommendations() {
  const [recommendations, setRecommendations] =
    useState<PersonalizedContentRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const result = await personalizedContentRecommendations({
          userId: "user-123",
          viewingHistory: ["job-1", "skill-2", "business-3"], // Mock data
        });
        setRecommendations(result);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, []);

  const renderSkeletons = (count: number) =>
    Array.from({ length: count }).map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    ));

  return (
    <div className="mx-auto max-w-5xl">
      <Card className="border-accent bg-accent/20">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-accent">
            <BotMessageSquare />
            For You
          </CardTitle>
          <CardDescription className="text-accent-foreground/80">
            Based on your recent activity, here are some resources and job
            categories you might find interesting.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-headline mb-4 text-2xl font-bold">
            Recommended Resources
          </h2>
          <div className="space-y-4">
            {loading
              ? renderSkeletons(3)
              : recommendations?.recommendedResources.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">
                        {rec}
                      </CardTitle>
                      <CardDescription>
                        A curated resource to boost your skills.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">Learn More</Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>

        <div>
          <h2 className="font-headline mb-4 text-2xl font-bold">
            Recommended Job Categories
          </h2>
          <div className="space-y-4">
            {loading
              ? renderSkeletons(3)
              : recommendations?.recommendedJobCategories.map((rec, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="font-headline text-lg">
                        {rec}
                      </CardTitle>
                      <CardDescription>
                        Explore roles in this growing category.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline">Browse Jobs</Button>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
