import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import {
  fetchRecommendations,
  RecommendationsResponse,
} from '../../src/api/recommendations.api';

export default function RecommendScreen() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<RecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchRecommendations(query);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>
        Get Recommendations
      </Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="e.g. low voc interior materials"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 12,
          borderRadius: 6,
        }}
      />

      <Pressable
        onPress={handleSearch}
        style={{
          marginTop: 12,
          backgroundColor: '#1e88e5',
          padding: 12,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>
          Find Recommendations
        </Text>
      </Pressable>

      {loading && <Text style={{ marginTop: 12 }}>Loading…</Text>}
      {error && <Text style={{ marginTop: 12 }}>Error: {error}</Text>}

      {data && (
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontWeight: '500' }}>
            AI Insight
          </Text>
          <Text style={{ marginBottom: 12 }}>
            {data.aiInsight.summary}
          </Text>

          {data.recommendations.length === 0 && (
            <Text>No matching materials found.</Text>
          )}

          {data.recommendations.map(rec => (
            <View
              key={rec.materialId}
              style={{
                padding: 12,
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 6,
                marginBottom: 12,
              }}
            >
              <Text style={{ fontWeight: '600' }}>{rec.name}</Text>
              <Text>Category: {rec.category}</Text>
              <Text>Match score: {rec.matchScore}</Text>

              <Text style={{ marginTop: 6 }}>
                Why recommended:
              </Text>
              {rec.whyRecommended.map(w => (
                <Text key={w}>• {w}</Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
